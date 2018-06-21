import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutGaugeComponent } from './components/donut-gauge';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DonutGaugeComponent],
  exports: [DonutGaugeComponent]
})
export class NgxChartsWebModule { }
