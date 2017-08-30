import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule  } from 'ngx-bootstrap';

import { AppComponent } from './components/app.component';

import { BooksService } from './services/books.service';

import { EnglishLettersPipe } from './pipes/english-letters.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';


@NgModule({
  declarations: [
    AppComponent,
    EnglishLettersPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    BooksService,
    TitleCasePipe,
    EnglishLettersPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
