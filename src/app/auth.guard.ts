import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(  private router: Router) {}
  securityLevel : number = 0;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let sl = localStorage.getItem("SecurityLevel") +"";
    this.securityLevel = Number.parseInt(sl);

    // Get the user's security level (example)

    // Check if security level is 1 or less than 99
    if (this.securityLevel === 1 || this.securityLevel < 99) {
      // Redirect to a route like login or access-denied
      this.router.navigate(['EmployeeAttendances']);

    }

    return true; // Allow access
  }
}