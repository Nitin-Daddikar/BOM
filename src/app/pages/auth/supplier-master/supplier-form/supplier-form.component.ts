import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Supplier, SupplierService } from '../services/supplier.service';

@Component({
    selector: 'app-supplier-form',
    templateUrl: './supplier-form.component.html',
    standalone: false
})
export class SupplierFormComponent implements OnInit {
    supplierForm: FormGroup;
    isEditing: boolean = false;
    loading: boolean = false;
    supplierId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private supplierService: SupplierService
    ) {
        this.supplierForm = this.fb.group({
            name: ['', [Validators.required]],
            lead_time: ['', [Validators.required, Validators.min(0)]],
            moq: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.supplierId = this.route.snapshot.params['id'] === 'new' ? null : +this.route.snapshot.params['id'];
        if (this.supplierId) {
            this.isEditing = true;
            this.loadSupplierData();
        }
    }

    loadSupplierData(): void {
        this.loading = true;
        this.supplierService.getSupplier(this.supplierId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.supplierForm.patchValue(response.data);
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading supplier:', error);
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.supplierForm.invalid) {
            Object.keys(this.supplierForm.controls).forEach(key => {
                const control = this.supplierForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const supplierData = this.supplierForm.value;
        this.loading = true;

        if (this.isEditing) {
            this.supplierService.updateSupplier(this.supplierId!, supplierData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error updating supplier:', error);
                }
            });
        } else {
            this.supplierService.createSupplier(supplierData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error creating supplier:', error);
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
    }
}