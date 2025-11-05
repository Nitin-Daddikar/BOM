import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BOM, BOMService, Component as BOMComponent } from '../services/bom.service';

@Component({
    selector: 'app-bom-form',
    templateUrl: './bom-form.component.html',
    standalone: false
})
export class BOMFormComponent implements OnInit {
    bomForm: FormGroup;
    isEditing: boolean = false;
    loading: boolean = false;
    bomId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private bomService: BOMService
    ) {
        this.bomForm = this.fb.group({
            fg_code: ['', [Validators.required]],
            fg_name: ['', [Validators.required]],
            fg_qty: ['', [Validators.required]],
            components: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.bomId = this.route.snapshot.params['id'] === 'new' ? null : +this.route.snapshot.params['id'];
        if (this.bomId) {
            this.isEditing = true;
            this.loadBOMData();
        }
    }

    loadBOMData(): void {
        this.loading = true;
        this.bomService.getBOM(this.bomId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    const bomData = response.data;
                    this.bomForm.patchValue({
                        fg_code: bomData.fg_code,
                        fg_name: bomData.fg_name,
                        fg_qty: bomData.fg_qty
                    });
                    
                    // Load components
                    if (bomData.components && bomData.components.length > 0) {
                        const componentsArray = this.bomForm.get('components') as FormArray;
                        bomData.components.forEach(component => {
                            componentsArray.push(this.createComponentFormGroup(component));
                        });
                    }
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading BOM:', error);
                this.loading = false;
            }
        });
    }

    get components(): FormArray {
        return this.bomForm.get('components') as FormArray;
    }

    createComponentFormGroup(component?: BOMComponent): FormGroup {
        return this.fb.group({
            code: [component?.code || '', [Validators.required]],
            name: [component?.name || '', [Validators.required]],
            quantity: [component?.quantity || '', [Validators.required]]
        });
    }

    addComponent(): void {
        this.components.push(this.createComponentFormGroup());
    }

    removeComponent(index: number): void {
        this.components.removeAt(index);
    }

    onSubmit(): void {
        if (this.bomForm.invalid) {
            Object.keys(this.bomForm.controls).forEach(key => {
                const control = this.bomForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const bomData = this.bomForm.value;
        this.loading = true;

        if (this.isEditing) {
            this.bomService.updateBOM(this.bomId!, bomData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error updating BOM:', error);
                }
            });
        } else {
            this.bomService.createBOM(bomData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error creating BOM:', error);
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
    }
}