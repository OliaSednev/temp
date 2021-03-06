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
const user_service_1 = require("../../services/user/user.service");
const router_1 = require("@angular/router");
let RootComponent = class RootComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    ngOnInit() {
        this.loggedInUser = this.userService.getLoggedInUser();
        this.userService.getLoggedInUserObservable().subscribe(user => {
            this.loggedInUser = user;
            if (!this.loggedInUser) {
                return;
            }
            this.username = user.name;
        });
    }
    logout() {
        this.userService.logout();
        this.userService.navigateToLoginPage();
        this.loggedInUser = undefined;
        this.username = undefined;
    }
    isActive(instruction) {
        return this.router.isActive(instruction, false);
    }
    get componentTitle() {
        if (!this.router.isActive('/drawing-canvas-list', true)) {
            if (!this.router.isActive('/drawing-canvas', true)) {
                return 'Drawing';
            }
            else {
                return 'Create a drawing-canvas';
            }
        }
        else {
            return 'Public Drawings';
        }
    }
};
RootComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './root.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], RootComponent);
exports.RootComponent = RootComponent;
//# sourceMappingURL=root.component.js.map