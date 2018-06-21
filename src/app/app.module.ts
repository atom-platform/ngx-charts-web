import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxChartsWebModule } from 'ngx-charts-web';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsWebModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
