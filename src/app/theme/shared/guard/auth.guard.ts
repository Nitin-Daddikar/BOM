import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(authenticated => {
        if (authenticated && !this.authService.isTokenExpired()) {
          return true;
        }
        // If token is expired, logout and redirect to login
        if (this.authService.isTokenExpired()) {
          this.authService.logout();
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}