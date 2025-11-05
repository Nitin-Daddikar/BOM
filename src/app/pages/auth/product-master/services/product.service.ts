import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, ApiService, PaginatedData } from 'src/app/theme/shared/service/api.service';
import { environment } from 'src/environments/environment';

export interface Product {
    id?: number;
    code: string;
    uom: string;
    category: string;
    created_at?: string;
    updated_at?: string;
}

@Injectable()
export class ProductService {
    private endpoint = 'products';

    constructor(private apiService: ApiService) { }

    getProducts(params?: any): Observable<ApiResponse<PaginatedData<Product>>> {
        if (environment.useDummayApi) {
            return this.apiService.get<PaginatedData<Product>>('68eb235243b1c97be9637b56/latest?meta=false', params);
        } else {
            return this.apiService.get<PaginatedData<Product>>(this.endpoint, params);
        }
    }

    getProduct(id: number): Observable<ApiResponse<Product>> {
        if (environment.useDummayApi) {
            return this.apiService.get<Product>('68eb25fe43b1c97be9637d8e/latest?meta=false');
        } else {
            return this.apiService.get<Product>(`${this.endpoint}/${id}`);
        }
    }

    createProduct(product: Product): Observable<ApiResponse<Product>> {
        return this.apiService.post<Product>(this.endpoint, product);
    }

    updateProduct(id: number, product: Product): Observable<ApiResponse<Product>> {
        return this.apiService.put<Product>(`${this.endpoint}/${id}`, product);
    }

    deleteProduct(id: number): Observable<ApiResponse<void>> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}