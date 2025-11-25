import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirQualityCard } from './air-quality-card';

describe('AirQualityCard', () => {
  let component: AirQualityCard;
  let fixture: ComponentFixture<AirQualityCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirQualityCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirQualityCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
