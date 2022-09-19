import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutGaugeDocComponent } from './donut-gauge-doc.component';

describe('DonutGaugeDocComponent', () => {
  let component: DonutGaugeDocComponent;
  let fixture: ComponentFixture<DonutGaugeDocComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutGaugeDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutGaugeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
