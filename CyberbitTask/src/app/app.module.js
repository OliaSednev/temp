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
const http_1 = require("@angular/http");
const forms_1 = require("@angular/forms");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const root_component_1 = require("./components/root/root.component");
const device_group_component_1 = require("./components/device-group/device-group.component");
const selections_summary_component_1 = require("./components/selections-summary/selections-summary.component");
const time_period_component_1 = require("./components/time-period/time-period.component");
const protocols_component_1 = require("./components/protocols/protocols.component");
// Services (providers)
const data_service_1 = require("./services/data/data.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, ngx_bootstrap_1.BsDropdownModule.forRoot(), ngx_bootstrap_1.CollapseModule.forRoot()],
        declarations: [root_component_1.RootComponent, device_group_component_1.DeviceGroupComponent, time_period_component_1.TimePeriodComponent, protocols_component_1.ProtocolsComponent, selections_summary_component_1.SelectionsSummaryComponent],
        providers: [data_service_1.DataService],
        bootstrap: [root_component_1.RootComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map