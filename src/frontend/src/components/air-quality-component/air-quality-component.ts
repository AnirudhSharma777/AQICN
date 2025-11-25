import { Component } from '@angular/core';
import { AirQualityService } from '../../service/air-quality-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AirQualityCard } from '../air-quality-card/air-quality-card';

@Component({
  selector: 'app-air-quality-component',
  standalone: true,
  imports: [FormsModule, CommonModule, AirQualityCard],
  templateUrl: './air-quality-component.html',
  styleUrls: ['./air-quality-component.css'],
})
export class AirQualityComponent {
  city = '';
  aqi: any = null;
  error: string | null = null;
  loading = false;

  constructor(private aqService: AirQualityService) {}

  search() {
    this.error = null;
    this.aqi = null;
    // Validate input
    if (!this.city || this.city.trim().length === 0) {
      this.error = 'Please enter a city name';
      return;
    }

    this.loading = true;
    this.aqService.getAirQuality(this.city).subscribe(
      (data) => {
        this.aqi = data;
        this.loading = false;
      },
      (err) => {
        this.error = err?.error?.message || err?.message || 'Something went wrong fetching data';
        console.error('Error fetching air quality data:', err);
        this.loading = false;
      }
    );
  }

  color(aqi: number) {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 200) return 'orange';
    return 'red';
  }

  aqiStatus(aqi: number) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  }

  pollutantKeys(obj: any) {
    return Object.keys(obj);
  }

  weatherKeys(obj: any) {
    return Object.keys(obj);
  }
}
