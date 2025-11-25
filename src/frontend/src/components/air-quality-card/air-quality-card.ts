import { NgClass, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-air-quality-card',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './air-quality-card.html',
  styleUrls: ['./air-quality-card.css'],
})
export class AirQualityCard {
  @Input() data: any;

  pollutantKeys(obj: any) {
    return Object.keys(obj);
  }
  weatherKeys(obj: any) {
    return Object.keys(obj);
  }

  aqiStatus(aqi: number) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  }

  colorClass(aqi: number) {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 200) return 'text-orange-600';
    return 'text-red-600';
  }

  gaugeBorder(aqi: number) {
  if (aqi <= 50) return 'border-green-400 shadow-lg shadow-green-200';
  if (aqi <= 100) return 'border-yellow-400 shadow-lg shadow-yellow-200';
  if (aqi <= 200) return 'border-orange-400 shadow-lg shadow-orange-200';
  return 'border-red-500 shadow-lg shadow-red-200';
}

}
