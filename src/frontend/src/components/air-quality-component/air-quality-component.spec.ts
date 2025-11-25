import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirQualityComponent } from './air-quality-component';

describe('AirQualityComponent', () => {
  let component: AirQualityComponent;
  let fixture: ComponentFixture<AirQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirQualityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirQualityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
