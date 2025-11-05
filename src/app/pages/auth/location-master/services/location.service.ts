import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, ApiService, PaginatedData } from 'src/app/theme/shared/service/api.service';
import { environment } from 'src/environments/environment';

export interface Location {
    id?: number;
    name: string;
    type: 'Plant' | 'Warehouse';
    created_at?: string;
    updated_at?: string;
}

@Injectable()
export class LocationService {
    private endpoint = 'locations';

    constructor(private apiService: ApiService) { }

    getLocations(params?: any): Observable<ApiResponse<PaginatedData<Location>>> {
        if (environment.useDummayApi) {
            return this.apiService.get<PaginatedData<Location>>('68eb2747ae596e708f0f3576/latest?meta=false', params);
        } else {
            return this.apiService.get<PaginatedData<Location>>(this.endpoint, params);
        }
    }

    getLocation(id: number): Observable<ApiResponse<Location>> {
        if (environment.useDummayApi) {
            return this.apiService.get<Location>('68eb2766d0ea881f409e6ea3/latest?meta=false');
        } else {
            return this.apiService.get<Location>(`${this.endpoint}/${id}`);
        }
    }

    createLocation(location: Location): Observable<ApiResponse<Location>> {
        return this.apiService.post<Location>(this.endpoint, location);
    }

    updateLocation(id: number, location: Location): Observable<ApiResponse<Location>> {
        return this.apiService.put<Location>(`${this.endpoint}/${id}`, location);
    }

    deleteLocation(id: number): Observable<ApiResponse<void>> {
        return this.apiService.delete<void>(`${this.endpoint}/${id}`);
    }
}