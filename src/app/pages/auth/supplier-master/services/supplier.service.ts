import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, ApiService, PaginatedData } from 'src/app/theme/shared/service/api.service';
import { environment } from 'src/environments/environment';

export interface Supplier {
    id?: number;
    name: string;
    lead_time: number;
    moq: string;
    created_at?: string;
    updated_at?: string;
}

@Injectable()
export class SupplierService {
    private endpoint = 'suppliers';

    constructor(private apiService: ApiService) { }

    getSuppliers(params?: any): Observable<ApiResponse<PaginatedData<Supplier>>> {
        if (environment.useDummayApi) {
            return this.apiService.get<PaginatedData<Supplier>>('68eb2a4543b1c97be96380cb/latest?meta=false', params);
        } else {
            return this.apiService.get<PaginatedData<Supplier>>(this.endpoint, params);
        }
    }

    getSupplier(id: number): Observable<ApiResponse<Supplier>> {
        if (environment.useDummayApi) {
            return this.apiService.get<Supplier>('68eb2a64d0ea881f409e70ca/latest?meta=false');
        } else {
            return this.apiService.get<Supplier>(`${this.endpoint}/${id}`);
        }
    }

    createSupplier(supplier: Supplier): Observable<ApiResponse<Supplier>> {
        return this.apiService.post<Supplier>(this.endpoint, supplier);
    }

    updateSupplier(id: number, supplier: Supplier): Observable<ApiResponse<Supplier>> {
        return this.apiService.put<Supplier>(`${this.endpoint}/${id}`, supplier);
    }

    deleteSupplier(id: number): Observable<ApiResponse<void>> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}