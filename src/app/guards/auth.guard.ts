import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import type { User } from '../types/user.type';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    if (sessionStorage.getItem('userLogin') || localStorage.getItem('userLogin')) {
      const user = JSON.parse((sessionStorage.getItem('userLogin') as string) || (localStorage.getItem('userLogin') as string)) as User;
      if (user?.id) {
        this.authService.userLoggedIn = user;
        return true;
      }
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
