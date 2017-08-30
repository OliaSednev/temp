// Modules (imports)
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './config/app.routing.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from "@angular/forms";
import {ChartsModule} from 'ng2-charts';
// import {ModalModule, BsDropdownModule, DatepickerModule, TimepickerModule, CarouselModule} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap';

// Components (declarations)
import {RootComponent}  from './components/root/root.component';
import {DashboardComponent}  from './components/dashboard/dashboard.component';
import {WebsitesComponent}  from './components/websites/websites.component';
import {CampaignComponent}  from './components/campaign/campaign.component';
import {LoginComponent}  from './components/login/login.component';
import {PageNotFoundComponent}  from './components/page-not-found/page-not-found.component';

// Services (providers)
import {NetService} from './services/net/net.service';
import {DashboardService} from './services/dashboard/dashboard.service';
import {WebsitesService} from './services/websites/websites.service';
import {CampaignService} from './services/campaign/campaign.service';
import {UserService} from './services/user/user.service';
import {LocalStorageService} from './services/localStorage/localStorage.service';
import {AuthGuard} from "./guards/auth-guard";

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpModule, FormsModule, ChartsModule,
        BsDropdownModule.forRoot(),
        // ModalModule.forRoot(),
        // DatepickerModule.forRoot(),
        // TimepickerModule.forRoot(),
        // DatepickerModule.forRoot(),
        ],
    declarations: [RootComponent, DashboardComponent, WebsitesComponent, CampaignComponent, LoginComponent, PageNotFoundComponent],
    providers: [NetService, DashboardService, WebsitesService, CampaignService, UserService, LocalStorageService, AuthGuard],
    bootstrap: [RootComponent]
})
export class AppModule {
}
