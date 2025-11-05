import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../theme/shared/service/auth.service';
import { ApiResponse } from 'src/app/theme/shared/service/api.service';
import { environment } from 'src/environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginData>> {
    return new Observable<ApiResponse<LoginData>>(observer => {
      const response: ApiResponse<LoginData> = {
        message: 'Login successful',
        success: true,
        data: {
          access_token: 'dummy_access_token',
          token_type: 'Bearer',
          expires_in: 360000
        }
      };
      this.authService.setToken(response.data.access_token);
      observer.next(response);
    });
    // return this.http.post<ApiResponse<LoginData>>(`${this.baseUrl}/auth/login`, credentials)
    //   .pipe(
    //     tap(response => {
    //       if (response.success && response.data?.access_token) {
    //         this.authService.setToken(response.data.access_token);
    //       }
    //     })
    //   );
  }
}