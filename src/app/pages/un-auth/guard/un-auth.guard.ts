import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../../theme/shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(authenticated => {
        // If user is authenticated and token is valid, redirect to dashboard
        if (authenticated && !this.authService.isTokenExpired()) {
          return this.router.createUrlTree(['/auth/dashboard']);
        }
        // Allow access to un-auth pages only if user is not authenticated
        return true;
      })
    );
  }
}