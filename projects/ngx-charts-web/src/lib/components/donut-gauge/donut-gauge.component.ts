import { Component, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { IDonutGaugeConfig } from './donut-gauge.interface';
import { DonutWidth, DonutGradientOrigin } from './donut-gauge.constants';

@Component({
  selector: 'ngx-donut-gauge',
  templateUrl: './donut-gauge.component.html',
  styleUrls: ['./donut-gauge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutGaugeComponent implements OnChanges {
  chartWidths = [0.03, 0.06, 0.09];
  gradientDirections = [
    { x1: '100%', x2: '0%', y1: '50%', y2: '50%' }, // Top
    { x1: '50%', x2: '50%', y1: '0%', y2: '100%' }, // Left
    { x1: '0%', x2: '100%', y1: '50%', y2: '50%' }, // Bottom
    { x1: '50%', x2: '50%', y1: '100%', y2: '0%' }, // Right
    { x1: '100%', x2: '0%', y1: '0%', y2: '100%' }, // TopLeft
    { x1: '100%', x2: '0%', y1: '100%', y2: '0%' }, // TopRight
    { x1: '0%', x2: '100%', y1: '0%', y2: '100%' }, // BottomLeft
    { x1: '0%', x2: '100%', y1: '100%', y2: '0%' }  // BottomRight
  ];

  defaultConfig: IDonutGaugeConfig = {
    strokeWidth: DonutWidth.Thin,
    gradientColors: ['#1951c1', '#c90cb3'],
    baseColor: '#B4B4B4',
    textColor: '#000000',
    gradientDirection: DonutGradientOrigin.TopLeft,
    title: 'Add your accessible title here for your Donut Chart'
  };

  @Input() config: IDonutGaugeConfig = {};
  @Input() value = 0;

  chartConfig = this.defaultConfig;
  calculatedValues: any;

  circleRadius: string;
  baseCircleStyles: any;
  gaugeStyles: any;
  fontStyles: any;
  gradient: Array<any>;
  gradientId: string;
  gradientSource: any;
  label: string;
  title: string;

  private baseGaugeStyle: any;

  constructor() {
    this.gradientId = 'gradient-' + this.create_UUID();
    this.baseGaugeStyle = { stroke: `url(${location.href}#${this.gradientId})` };
    this.onConfigUpdate();
  }

  create_UUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  ngOnChanges(changes) {
    if (changes.config) {
      this.onConfigUpdate();
    }
    if (changes.value) {
      this.onValueUpdate();
    }
  }

  calculateValues(config) {
    const strokeWidth = this.chartWidths[config.strokeWidth];
    const circleRadius = .5 - strokeWidth / 2;
    const dashArrayMax = 2 * Math.PI * circleRadius;
    return {
      strokeWidth,
      circleRadius,
      dashArrayMax
    };
  }

  onConfigUpdate() {
    this.chartConfig = {
      ...this.defaultConfig,
      ...this.config
    };

    this.calculatedValues = this.calculateValues(this.chartConfig);

    this.gradient = this.getGradientPercentages(this.chartConfig.gradientColors);

    this.baseCircleStyles = this.getBaseCircleStyles(this.chartConfig.baseColor, this.calculatedValues.strokeWidth);

    this.circleRadius = this.toPercent(this.calculatedValues.circleRadius);

    this.fontStyles = this.getFontStyles(this.chartConfig.textColor);

    this.gaugeStyles = this.updateGaugeStyles(this.gaugeStyles, this.calculatedValues);

    this.gradientSource = this.gradientDirections[this.chartConfig.gradientDirection];
    this.label = this.chartConfig.label;
    this.title = this.chartConfig.title;
  }

  onValueUpdate() {
    this.gaugeStyles = this.updateGaugeStyles(this.gaugeStyles, this.calculatedValues);
  }

  getGradientPercentages(colors) {
    return colors.map((color, index, arr) => (
      {
        percent: this.toPercent((index) ? index / (arr.length - 1) : 0),
        color: color
      }
    ));
  }

  getBaseCircleStyles(color, widthProportion) {
    return {
      'stroke': color,
      'stroke-width': this.toPercent(widthProportion),
    };
  }

  getFontStyles(color) {
    return {
      'fill': color
    };
  }

  updateGaugeStyles(oldStyle = this.baseGaugeStyle, calculatedValues) {
    const gaugeStyle = { ...oldStyle };

    const dashArrayMax = calculatedValues.dashArrayMax;
    const dashArrayMaxPercent = this.toPercent(dashArrayMax);
    const gaugeLength = this.toPercent(this.value * dashArrayMax);

    gaugeStyle['stroke-width'] = this.toPercent(calculatedValues.strokeWidth);
    gaugeStyle['stroke-dasharray'] = `${gaugeLength} ${dashArrayMaxPercent}`;

    return gaugeStyle;
  }

  toPercent(num) {
    return `${num * 100}%`;
  }

}
