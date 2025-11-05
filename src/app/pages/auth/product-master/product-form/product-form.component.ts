import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../services/product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    standalone: false
})
export class ProductFormComponent implements OnInit {
    productForm: FormGroup;
    isEditing: boolean = false;
    loading: boolean = false;
    productId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private productService: ProductService
    ) {
        this.productForm = this.fb.group({
            code: ['', [Validators.required]],
            uom: ['', [Validators.required]],
            category: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.productId = this.route.snapshot.params['id'] === 'new' ? null : +this.route.snapshot.params['id'];
        if (this.productId) {
            this.isEditing = true;
            this.loadProductData();
        }
    }

    loadProductData(): void {
        this.loading = true;
        this.productService.getProduct(this.productId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.productForm.patchValue(response.data);
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading product:', error);
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.productForm.invalid) {
            Object.keys(this.productForm.controls).forEach(key => {
                const control = this.productForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const productData = this.productForm.value;
        this.loading = true;

        if (this.isEditing) {
            this.productService.updateProduct(this.productId!, productData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error updating product:', error);
                }
            });
        } else {
            this.productService.createProduct(productData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error creating product:', error);
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
    }
}