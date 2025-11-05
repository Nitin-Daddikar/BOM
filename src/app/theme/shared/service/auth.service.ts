import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {
    // Check if token exists on startup
    this.isAuthenticatedSubject.next(!!this.getToken());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      // return (Math.floor((new Date).getTime() / 1000)) >= expiry;
      return false; // Placeholder: Implement actual token expiry check
    } catch {
      return true;
    }
  }
}