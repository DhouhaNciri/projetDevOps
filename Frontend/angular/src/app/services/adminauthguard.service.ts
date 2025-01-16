import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminauthguardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const adminData = localStorage.getItem('admin');

    if (adminData) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}