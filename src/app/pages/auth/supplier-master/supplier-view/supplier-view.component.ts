import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Supplier, SupplierService } from '../services/supplier.service';

@Component({
    selector: 'app-supplier-view',
    templateUrl: './supplier-view.component.html',
    standalone: false
})
export class SupplierViewComponent implements OnInit {
    supplier: Supplier | null = null;
    loading: boolean = false;
    supplierId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private supplierService: SupplierService
    ) { }

    ngOnInit(): void {
        this.supplierId = +this.route.snapshot.params['id'];
        if (this.supplierId) {
            this.loadSupplierData();
        }
    }

    loadSupplierData(): void {
        this.loading = true;
        this.supplierService.getSupplier(this.supplierId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.supplier = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading supplier:', error);
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}