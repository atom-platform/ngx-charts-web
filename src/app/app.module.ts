import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxChartsWebModule } from 'ngx-charts-web';
import { DonutGaugeDocComponent } from './documentation/donut-gauge-doc/donut-gauge-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    DonutGaugeDocComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsWebModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
