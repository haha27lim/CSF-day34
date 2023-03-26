import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {

  // declare an observable of type Weather array
  weather$!: Observable<Weather[]>
  // declare an array of type Weather
  weather: Weather[] = []
  // declare a subscription object
  weatherSub!: Subscription

  // constructor with dependency injection for WeatherService
  constructor(private weatherSvc: WeatherService) { }

  // implementation of ngOnInit hook
  ngOnInit(): void {
    // log message to console
    console.info('>> subscribing to weather')
    // assign subscription object to onWeather observable and set weather array to data received from observable
    this.weatherSub = this.weatherSvc.onWeather.subscribe(
      (data) => this.weather = data
    )
    //this.weather$ = this.weatherSvc.onWeather.asObservable()
  }

  // implementation of ngOnDestroy hook
  ngOnDestroy(): void {
      this.weatherSub.unsubscribe()
  }

}
