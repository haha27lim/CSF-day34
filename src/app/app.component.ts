import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Weather } from './models';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // declare a form group and an array of type Weather
  form!: FormGroup
  weather: Weather[] = []
  // declare an observable of type Weather array
  weather$!: Observable<Weather[]>

  // constructor with dependency injection for FormBuilder and WeatherService
  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) { }

  // implementation of ngOnInit hook
  ngOnInit(): void {
    // set up the form group with city control and validation
    this.form = this.fb.group({
      city: this.fb.control('', [ Validators.required ])
    })
  }

  // function to get weather data for the input city
  getWeather() {
    // get the city value from the form
    const city = this.form.value.city
    console.info('>>> city: ', city)

    // Call getWeather method from the WeatherService and handle the result using promises
    // this.weatherSvc.getWeather(city)
    //   .then(result => {
    //     this.weather = result
    //     console.info('>>> weather: ', this.weather)
    //     this.form.reset() // reset the form after getting the weather data
    //   })
    //   .catch(error => {
    //     console.info('>>> error: ', error)
    //   })

    // Alternatively, use the observable version of the getWeather method
    //this.weather$ = this.weatherSvc.getWeatherAsObservable(city)
    this.weatherSvc.getWeather(city)
  }
}
