"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const drawing_list_component_1 = require("../components/drawing-list/drawing-list.component");
const drawing_canvas_component_1 = require("../components/drawing-canvas/drawing-canvas.component");
const login_component_1 = require("../components/login/login.component");
const auth_guard_1 = require("../guards/auth-guard");
const page_not_found_component_1 = require("../components/page-not-found/page-not-found.component");
const routes = [
    { path: '', redirectTo: '/drawing-list', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'drawing-list', component: drawing_list_component_1.DrawingListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'drawing', component: drawing_canvas_component_1.DrawingComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'drawing/:id', component: drawing_canvas_component_1.DrawingComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.component.js.map