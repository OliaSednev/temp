// Modules (imports)
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './config/app.routing.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule, CarouselModule} from 'ngx-bootstrap';
import {RootComponent}  from './components/root/root.component';
import {DrawingListComponent}  from './components/drawing-list/drawing-list.component';
import {DrawingComponent}  from './components/drawing-canvas/drawing-canvas.component';
import {LoginComponent}  from './components/login/login.component';
import {PageNotFoundComponent}  from './components/page-not-found/page-not-found.component';
// Services (providers)
import {NetService} from './services/net/net.service';
import {DrawingService} from './services/drawing/drawing.service';
import {UserService} from './services/user/user.service';
import {LocalStorageService} from './services/localStorage/localStorage.service';
import {AuthGuard} from './guards/auth-guard';
import {ToastService} from './services/toast/toast.service';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpModule, FormsModule,
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        ],
    declarations: [RootComponent, DrawingListComponent, DrawingComponent, LoginComponent, PageNotFoundComponent],
    providers: [NetService, DrawingService, UserService, LocalStorageService, ToastService, AuthGuard],
    bootstrap: [RootComponent]
})
export class AppModule {
}
