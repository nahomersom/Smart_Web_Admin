import { Router, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGarde implements CanLoad {
    constructor(private router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        if (localStorage.length > 0) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
         }
    }
}
