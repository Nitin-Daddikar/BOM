import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, ApiService, PaginatedData } from 'src/app/theme/shared/service/api.service';
import { environment } from 'src/environments/environment';

export interface PurchaseOrder {
    id?: number;
    po_number: string;
    supplier: string;
    quantity: string;
    due_date: string;
    created_at?: string;
    updated_at?: string;
}

@Injectable()
export class PurchaseOrderService {
    private endpoint = 'purchase-orders';

    constructor(private apiService: ApiService) { }

    getPurchaseOrders(params?: any): Observable<ApiResponse<PaginatedData<PurchaseOrder>>> {
        if (environment.useDummayApi) {
            return this.apiService.get<PaginatedData<PurchaseOrder>>('68eb2b8343b1c97be963820c/latest?meta=false', params);
        } else {
            return this.apiService.get<PaginatedData<PurchaseOrder>>(this.endpoint, params);
        }
    }

    getPurchaseOrder(id: number): Observable<ApiResponse<PurchaseOrder>> {
        if (environment.useDummayApi) {
            return this.apiService.get<PurchaseOrder>('68eb2ba543b1c97be9638228/latest?meta=false');
        } else {
            return this.apiService.get<PurchaseOrder>(`${this.endpoint}/${id}`);
        }
    }

    createPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<ApiResponse<PurchaseOrder>> {
        return this.apiService.post<PurchaseOrder>(this.endpoint, purchaseOrder);
    }

    updatePurchaseOrder(id: number, purchaseOrder: PurchaseOrder): Observable<ApiResponse<PurchaseOrder>> {
        return this.apiService.put<PurchaseOrder>(`${this.endpoint}/${id}`, purchaseOrder);
    }

    deletePurchaseOrder(id: number): Observable<ApiResponse<void>> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}