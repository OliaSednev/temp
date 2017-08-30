import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from '../components/dashboard/dashboard.component';
import { WebsitesComponent }   from '../components/websites/websites.component';
import { CampaignComponent }   from '../components/campaign/campaign.component';
import {LoginComponent} from "../components/login/login.component";
import {AuthGuard} from "../guards/auth-guard";
import {PageNotFoundComponent} from "../components/page-not-found/page-not-found.component";


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'websites', component: WebsitesComponent, canActivate: [AuthGuard] },
    { path: 'websites/:name', component: CampaignComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent } ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}