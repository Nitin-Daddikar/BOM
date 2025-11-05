import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BOM, BOMService } from '../services/bom.service';

@Component({
    selector: 'app-bom-view',
    templateUrl: './bom-view.component.html',
    standalone: false
})
export class BOMViewComponent implements OnInit {
    bom: BOM | null = null;
    loading: boolean = false;
    bomId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private bomService: BOMService
    ) { }

    ngOnInit(): void {
        this.bomId = +this.route.snapshot.params['id'];
        if (this.bomId) {
            this.loadBOMData();
        }
    }

    loadBOMData(): void {
        this.loading = true;
        this.bomService.getBOM(this.bomId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.bom = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading BOM:', error);
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.location.back();
    }

    getComponentUnit(componentCode: string): string {
        // Simple logic to determine unit based on component code prefix
        if (componentCode.startsWith('ST-') || componentCode.startsWith('AL-')) {
            return 'Kg';
        } else if (componentCode.startsWith('PCB-') || componentCode.startsWith('SW-') || componentCode.startsWith('RES-')) {
            return 'Pcs';
        } else if (componentCode.startsWith('MOT-')) {
            return 'Unit';
        } else if (componentCode.startsWith('WIR-')) {
            return 'Meter';
        } else {
            return 'Unit';
        }
    }
}