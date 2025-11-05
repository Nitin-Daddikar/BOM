import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, ApiService, PaginatedData } from 'src/app/theme/shared/service/api.service';
import { environment } from 'src/environments/environment';

export interface Component {
    code: string;
    name: string;
    quantity: string;
}

export interface BOM {
    id?: number;
    fg_code: string;
    fg_name: string;
    fg_qty: string;
    components?: Component[];
    created_at?: string;
    updated_at?: string;
}

@Injectable()
export class BOMService {
    private endpoint = 'bom';

    constructor(private apiService: ApiService) { }

    getBOMs(params?: any): Observable<ApiResponse<PaginatedData<BOM>>> {
            if (environment.useDummayApi) {
                return this.apiService.get<PaginatedData<BOM>>('68eb2edcd0ea881f409e74d2/latest?meta=false', params);
            } else {
                return this.apiService.get<PaginatedData<BOM>>(this.endpoint, params);
            }
    }

    getBOM(id: number): Observable<ApiResponse<BOM>> {
            if (environment.useDummayApi) {
                return this.apiService.get<BOM>('68eb2ef4ae596e708f0f3b9c/latest?meta=false');
            } else {
                return this.apiService.get<BOM>(`${this.endpoint}/${id}`);
            }
    }

    createBOM(bom: BOM): Observable<ApiResponse<BOM>> {
        return this.apiService.post<BOM>(this.endpoint, bom);
    }

    updateBOM(id: number, bom: BOM): Observable<ApiResponse<BOM>> {
        return this.apiService.put<BOM>(`${this.endpoint}/${id}`, bom);
    }

    deleteBOM(id: number): Observable<ApiResponse<void>> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}