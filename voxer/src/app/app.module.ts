import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {PersonService} from './person.service';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {LocalStorageService} from './local-storage.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [ AppComponent ],
  providers:    [ PersonService, LocalStorageService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
