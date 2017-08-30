"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const localStorage_service_1 = require("../localStorage/localStorage.service");
const M = require("../../models/app.models");
const router_1 = require("@angular/router");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
const net_service_1 = require("../net/net.service");
let UserService = class UserService {
    constructor(localStorageService, net, router) {
        this.localStorageService = localStorageService;
        this.net = net;
        this.router = router;
        this.user = this.localStorageService.get(M.LocalStorageKey.User);
        this.userChangeSubscriber = new Subject_1.Subject();
        this.userObservable = Observable_1.Observable.create(o => {
            this.userChangeSubscriber.subscribe(o);
            this.user = this.localStorageService.get(M.LocalStorageKey.User);
            // if (!this.user) {
            //     this.user = {
            //         user: {
            //             name: 'ninja',
            //             role: 'Admin',
            //             permissions: [],
            //         },
            //         token: '12345',
            //         expiresOn: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7) - (1000*60*60))
            //     };
            //
            //     this.localStorageService.set(M.LocalStorageKey.User, this.user);
            // }
            if (this.isLoggedIn()) {
                this.userChangeSubscriber.next(this.user);
            }
        });
    }
    login(username, password) {
        return Observable_1.Observable.create(o => {
            this.net.login(username, password).subscribe(user => {
                if (!user) {
                    o.error();
                    o.complete();
                    return;
                }
                this.user = user;
                // Expires a week less an hour from now
                // user.expiresOn =
                //     new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7) - (1000*60*60));
                this.localStorageService.set(M.LocalStorageKey.User, this.user);
                this.userChangeSubscriber.next(this.user);
                o.next(user);
                o.complete();
            }, error => {
                o.error(error);
                o.complete();
            });
        });
    }
    logout() {
        this.user = undefined;
        this.localStorageService.delete(M.LocalStorageKey.User);
        this.userChangeSubscriber.next(this.user);
    }
    isLoggedIn() {
        if (this.user && this.user.user.name && this.user.user.name.length > 0) {
            // && this.user.expiresOn && new Date() < new Date(this.user.expiresOn)) {
            return true;
        }
        return false;
    }
    getLoggedInUser() {
        if (this.isLoggedIn()) {
            return this.user;
        }
        return undefined;
    }
    getLoggedInUserObservable() {
        return this.userObservable;
    }
    navigateToLoginPage(returnPath) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: returnPath } });
    }
};
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [localStorage_service_1.LocalStorageService,
        net_service_1.NetService,
        router_1.Router])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map