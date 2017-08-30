import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './config/app.routing.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent}  from './app.component';
import {CatalogItemService} from './services/catalog.service';
// import {ToastService} from './services/toast/toast.service';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, HttpModule, FormsModule ],
  declarations: [ AppComponent ],
  providers:    [ CatalogItemService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
