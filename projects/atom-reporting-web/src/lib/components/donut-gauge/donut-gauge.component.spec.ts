import { SimpleChanges, SimpleChange } from '@angular/core';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DonutGaugeComponent, DonutWidth, DonutGradientOrigin } from './';

describe('DonutGaugeComponent', () => {
  let component: DonutGaugeComponent;
  let fixture: ComponentFixture<DonutGaugeComponent>;
  const mockValue = 0.75;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonutGaugeComponent]
    })
      .compileComponents();
  }));

  describe('Default Config', () => {
    let defaultConfig;

    beforeEach(() => {
      fixture = TestBed.createComponent(DonutGaugeComponent);
      component = fixture.componentInstance;
      const defaultVal = component.value;

      component.value = mockValue;

      const changes: SimpleChanges = {
        value: new SimpleChange(defaultVal, mockValue, false)
      };
      // jasmine doesn't want to trigger change detection on input change and is a known issue so
      // triggering ngOnChanges updates here
      component.ngOnChanges(changes);

      defaultConfig = component.chartConfig;

      fixture.detectChanges();
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should display percentage to the nearest .1%', () => {
      const donutValue = fixture.debugElement.nativeElement.querySelector('.donut-gauge__value');
      expect(donutValue.textContent).toContain(`${mockValue * 100}%`);
    });

    it('should set gradient direction to default settings', () => {
      const expectedValues = component.gradientDirections[defaultConfig.gradientDirection];

      const linearGradient = fixture.debugElement.nativeElement.querySelector(`#${component.gradientId}`);
      Object.keys(expectedValues).forEach(attrKey => {
        expect(linearGradient.attributes[attrKey].value).toEqual(expectedValues[attrKey]);
      });
    });

    it('should set gradient colors', fakeAsync(() => {
      const stops = fixture.debugElement.nativeElement.querySelectorAll('stop');
      const expectedStopOffsets = ['0%', '100%'];
      for (let i = 0; i < stops.length; i++) {
        const stop = stops[i];
        expect(stop.attributes.offset.value).toEqual(expectedStopOffsets[i]);
        expect(stop.attributes['stop-color'].value).toEqual(defaultConfig.gradientColors[i]);
      }
    }));

    it('should set length of gauge', () => {
      const gauge = fixture.debugElement.nativeElement.querySelector('.donut-gauge__gauge');
      const gaugeStyles = window.getComputedStyle(gauge, null);
      const values = gaugeStyles.strokeDasharray.split(' ')
        .map(value => parseFloat(value));

      expect(values[0]).toBeCloseTo(values[1] * mockValue, 0.1);

    });

    it('should have no label', () => {
      const label = fixture.debugElement.nativeElement.querySelector('.donut-gauge__label');
      expect(label).toBeNull();
    });

    it('should add a title', () => {
      const title = fixture.debugElement.nativeElement.querySelector('title');
      expect(title.textContent).toBe(defaultConfig.title);
    });
  });

  describe('Overriding Config', () => {
    const mockConfig = {
      strokeWidth: DonutWidth.Thick,
      gradientColors: ['#ffffff', '#cccccc', '#888888', '#333333', '#000000'],
      baseColor: '#B4B4B4',
      textColor: '#000000',
      gradientDirection: DonutGradientOrigin.BottomRight,
      label: 'label',
      title: 'title'
    };

    beforeEach(() => {
      fixture = TestBed.createComponent(DonutGaugeComponent);
      component = fixture.componentInstance;
      const defaultVal = component.value;
      const defaultConfig = component.config;

      component.value = mockValue;
      component.config = mockConfig;

      const changes: SimpleChanges = {
        value: new SimpleChange(defaultVal, mockValue, false),
        config: new SimpleChange(defaultConfig, mockConfig, false)
      };
      // jasmine doesn't want to trigger change detection on input change and is a known issue so
      // triggering ngOnChanges updates here
      component.ngOnChanges(changes);

      fixture.detectChanges();
    });

    it('should change gradient directions if specified', () => {
      const expectedValues = component.gradientDirections[DonutGradientOrigin.BottomRight];

      const linearGradient = fixture.debugElement.nativeElement.querySelector(`#${component.gradientId}`);
      Object.keys(expectedValues).forEach(attrKey => {
        expect(linearGradient.attributes[attrKey].value).toEqual(expectedValues[attrKey]);
      });
    });

    it('should change gradient colors if specified', fakeAsync(() => {
      const stops = fixture.debugElement.nativeElement.querySelectorAll('stop');
      const expectedStopOffsets = ['0%', '25%', '50%', '75%', '100%'];
      for (let i = 0; i < stops.length; i++) {
        const stop = stops[i];
        expect(stop.attributes.offset.value).toEqual(expectedStopOffsets[i]);
        expect(stop.attributes['stop-color'].value).toEqual(mockConfig.gradientColors[i]);
      }
    }));

    it('should update the title', () => {
      const title = fixture.debugElement.nativeElement.querySelector('title');
      expect(title.textContent).toBe(mockConfig.title);
    });

    it('should apply label if specified', () => {
      const label = fixture.debugElement.nativeElement.querySelector('.donut-gauge__label');
      expect(label.textContent).toContain(mockConfig.label);
    });
  });
});
