import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product, ProductService } from '../services/product.service';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    standalone: false
})
export class ProductViewComponent implements OnInit {
    product: Product | null = null;
    loading: boolean = false;
    productId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.productId = +this.route.snapshot.params['id'];
        if (this.productId) {
            this.loadProductData();
        }
    }

    loadProductData(): void {
        this.loading = true;
        this.productService.getProduct(this.productId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.product = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading product:', error);
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}