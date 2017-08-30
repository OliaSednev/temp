"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules (imports)
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_routing_component_1 = require("./config/app.routing.component");
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const ng2_charts_1 = require("ng2-charts");
// import {ModalModule, BsDropdownModule, DatepickerModule, TimepickerModule, CarouselModule} from 'ngx-bootstrap';
const ngx_bootstrap_1 = require("ngx-bootstrap");
// Components (declarations)
const root_component_1 = require("./components/root/root.component");
const dashboard_component_1 = require("./components/dashboard/dashboard.component");
const websites_component_1 = require("./components/websites/websites.component");
const campaign_component_1 = require("./components/campaign/campaign.component");
const login_component_1 = require("./components/login/login.component");
const page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
// Services (providers)
const net_service_1 = require("./services/net/net.service");
const dashboard_service_1 = require("./services/dashboard/dashboard.service");
const websites_service_1 = require("./services/websites/websites.service");
const campaign_service_1 = require("./services/campaign/campaign.service");
const user_service_1 = require("./services/user/user.service");
const localStorage_service_1 = require("./services/localStorage/localStorage.service");
const auth_guard_1 = require("./guards/auth-guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_component_1.AppRoutingModule, http_1.HttpModule, forms_1.FormsModule, ng2_charts_1.ChartsModule,
            ngx_bootstrap_1.BsDropdownModule.forRoot(),
        ],
        declarations: [root_component_1.RootComponent, dashboard_component_1.DashboardComponent, websites_component_1.WebsitesComponent, campaign_component_1.CampaignComponent, login_component_1.LoginComponent, page_not_found_component_1.PageNotFoundComponent],
        providers: [net_service_1.NetService, dashboard_service_1.DashboardService, websites_service_1.WebsitesService, campaign_service_1.CampaignService, user_service_1.UserService, localStorage_service_1.LocalStorageService, auth_guard_1.AuthGuard],
        bootstrap: [root_component_1.RootComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map