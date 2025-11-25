import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirQualityService {
  constructor(private http: HttpClient) {}

  getAirQuality(city: string): Observable<any> {
    return this.http.get(`http://localhost:8085/api/v1/airquality?city=${city}`);
  }
}
