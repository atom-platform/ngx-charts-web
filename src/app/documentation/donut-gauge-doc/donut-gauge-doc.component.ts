import { Component, OnInit } from '@angular/core';
import { IDonutGaugeConfig, DonutWidth, DonutGradientOrigin } from 'ngx-charts-web';

@Component({
  selector: 'app-donut-gauge-doc',
  templateUrl: './donut-gauge-doc.component.html',
  styleUrls: ['./donut-gauge-doc.component.scss']
})
export class DonutGaugeDocComponent implements OnInit {

  chartValue = 0;

  chartOverride1: IDonutGaugeConfig = {
    strokeWidth: DonutWidth.Medium,
    gradientColors: ['#c93cc2']
  };

  chartOverride2: IDonutGaugeConfig = {
    strokeWidth: DonutWidth.Thick,
    gradientColors: ['#9d11af', '#309aad', '#cef995'],
    baseColor: '#dae5c9',
    textColor: '#309aad',
    gradientDirection: DonutGradientOrigin.BottomLeft,
    label: 'testLabel',
    title: 'title'
  };

  chartOverride3: IDonutGaugeConfig = {
    strokeWidth: DonutWidth.Medium,
    gradientColors: ['#309aad', '#cef995', '#9d11af'],
    baseColor: '#dae5c9',
    textColor: '#309aad',
    gradientDirection: DonutGradientOrigin.TopRight,
    label: 'otherLabel'
  };

  chartOverride4: IDonutGaugeConfig = this.chartOverride2;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.chartValue = 0.75;
    }, 200);
  }

  changeValue() {
    this.chartValue = Math.random();
  }

  changeConfig() {
    this.chartOverride4 = (this.chartOverride4 === this.chartOverride2)
      ? this.chartOverride3
      : this.chartOverride2;
  }
}

