import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrder, PurchaseOrderService } from '../services/purchase-order.service';

@Component({
    selector: 'app-purchase-order-form',
    templateUrl: './purchase-order-form.component.html',
    standalone: false
})
export class PurchaseOrderFormComponent implements OnInit {
    purchaseOrderForm: FormGroup;
    isEditing: boolean = false;
    loading: boolean = false;
    purchaseOrderId: number | null = null;

    // Supplier dropdown options
    supplierOptions = [
        'ABC Manufacturing Co.',
        'XYZ Electronics Ltd.',
        'Global Materials Inc.',
        'Premier Steel Works',
        'Tech Components Supply',
        'Industrial Chemical Corp.',
        'Precision Tools & Parts',
        'Quality Plastics Pvt Ltd'
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private purchaseOrderService: PurchaseOrderService
    ) {
        this.purchaseOrderForm = this.fb.group({
            po_number: ['', [Validators.required]],
            supplier: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
            due_date: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.purchaseOrderId = this.route.snapshot.params['id'] === 'new' ? null : +this.route.snapshot.params['id'];
        if (this.purchaseOrderId) {
            this.isEditing = true;
            this.loadPurchaseOrderData();
        }
    }

    loadPurchaseOrderData(): void {
        this.loading = true;
        this.purchaseOrderService.getPurchaseOrder(this.purchaseOrderId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.purchaseOrderForm.patchValue(response.data);
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading purchase order:', error);
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.purchaseOrderForm.invalid) {
            Object.keys(this.purchaseOrderForm.controls).forEach(key => {
                const control = this.purchaseOrderForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const purchaseOrderData = this.purchaseOrderForm.value;
        this.loading = true;

        if (this.isEditing) {
            this.purchaseOrderService.updatePurchaseOrder(this.purchaseOrderId!, purchaseOrderData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error updating purchase order:', error);
                }
            });
        } else {
            this.purchaseOrderService.createPurchaseOrder(purchaseOrderData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error creating purchase order:', error);
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
    }
}