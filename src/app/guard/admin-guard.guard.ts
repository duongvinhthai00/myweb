import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminModel } from '../model/AdminModel';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate, CanActivateChild {
  keyAdmin = "adminLogined";
  admin : AdminModel = null;

  constructor(private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.admin = JSON.parse(localStorage.getItem(this.keyAdmin));
    if(this.admin == null){
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.admin = JSON.parse(localStorage.getItem(this.keyAdmin));
    if(this.admin == null){
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
  
}
