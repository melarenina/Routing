import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // tslint:disable-next-line:triple-equals
        return this.authService.isAuthenticated()
            // tslint:disable-next-line:align
            .then(
                (authenticaded: boolean) => {
                    if (authenticaded) {
                        return true;
                    }else{
                        this.router.navigate(['/']);
                        return false;
                    }
                }
            );
    }
}
