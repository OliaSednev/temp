import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingListComponent}   from '../components/drawing-list/drawing-list.component';
import { DrawingComponent }   from '../components/drawing-canvas/drawing-canvas.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guards/auth-guard';
import { PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';


const routes: Routes = [
    { path: '', redirectTo: '/drawing-list', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'drawing-list', component: DrawingListComponent, canActivate: [AuthGuard] },
    { path: 'drawing', component: DrawingComponent, canActivate: [AuthGuard] },
    { path: 'drawing/:id', component: DrawingComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent } ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
