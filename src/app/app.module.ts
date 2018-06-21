import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AtomReportingWebModule } from 'atom-reporting-web';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AtomReportingWebModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
