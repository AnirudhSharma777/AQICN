import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AirQualityComponent } from "../components/air-quality-component/air-quality-component";
import { AirQualityCard } from "../components/air-quality-card/air-quality-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AirQualityComponent, AirQualityCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
