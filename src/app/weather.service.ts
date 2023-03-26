import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable, Subject, tap } from "rxjs";
import { Weather } from "./models";

// Defining URL and APPID for the openweathermap API
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
const APPID = "__YOUR_KEY_HERE__"

// Creating a service and injecting HttpClient
@Injectable()
export class WeatherService {

  // Creating a Subject of Weather array to be used to emit data to subscribed components
  onWeather = new Subject<Weather[]>

  constructor(private http: HttpClient) { }

  // Method to get weather data as an observable
  getWeatherAsObservable(city: string): Observable<Weather[]> {
    // Defining query parameters for the API call
    const params = new HttpParams()
        .set('q', city)
        .set('units', 'metric')
        .set('appid', APPID)

    // Sending GET request to the openweathermap API with query parameters and getting the response as an observable
    return this.http.get<Weather[]>(WEATHER_URL, { params })
        // Processing the response using rxjs operators
        .pipe(
          // Mapping the response data to get only weather information
          // map((data:any) => {
            // console.info('>>>> in map')
            // return data['weather'] as Weather[]
          // }),
          // Logging data to console and emitting the data to the subscribed components
          // tap(data => {
          //   console.info('>>>> data: ', data)
          //   this.onWeather.next(data)
          // })
        )
  }

  // Method to get weather data as a promise
  getWeather(city: string): Promise<Weather[]> {
    // Getting weather data as an observable and then converting it to a promise
    return firstValueFrom(
      this.getWeatherAsObservable(city)
    )
    // Processing the response data using promise chain and emitting the data to the subscribed components
    .then((data: any) => {
      // map() and tap()
      const w = data['weather'] as Weather[]
      this.onWeather.next(w)
      return w
    })
    // .then(data => {
    //   this.onWeather.next(data)
    //   return data
    // })
  }
}
