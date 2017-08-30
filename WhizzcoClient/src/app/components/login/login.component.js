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
const router_1 = require("@angular/router");
const user_service_1 = require("../../services/user/user.service");
let LoginComponent = class LoginComponent {
    constructor(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.loginData = {};
        this.invalidCredentials = false;
    }
    ngOnInit() {
        this.userService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    login($event) {
        $event.preventDefault();
        this.userService.login(this.loginData.username, this.loginData.password)
            .subscribe(data => {
            this.invalidCredentials = false;
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.invalidCredentials = true;
        });
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        user_service_1.UserService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map