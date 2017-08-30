import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from "../services/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.userService.isLoggedIn()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.userService.navigateToLoginPage(state.url);
        return false;
    }
}