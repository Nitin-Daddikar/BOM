import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PurchaseOrder, PurchaseOrderService } from '../services/purchase-order.service';

@Component({
    selector: 'app-purchase-order-view',
    templateUrl: './purchase-order-view.component.html',
    standalone: false
})
export class PurchaseOrderViewComponent implements OnInit {
    purchaseOrder: PurchaseOrder | null = null;
    loading: boolean = false;
    purchaseOrderId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private purchaseOrderService: PurchaseOrderService
    ) { }

    ngOnInit(): void {
        this.purchaseOrderId = +this.route.snapshot.params['id'];
        if (this.purchaseOrderId) {
            this.loadPurchaseOrderData();
        }
    }

    loadPurchaseOrderData(): void {
        this.loading = true;
        this.purchaseOrderService.getPurchaseOrder(this.purchaseOrderId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.purchaseOrder = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading purchase order:', error);
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}