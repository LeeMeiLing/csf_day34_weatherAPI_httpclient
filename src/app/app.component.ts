import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { Weather } from './models';

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const WEATHER_API_KEY = 'c5544a7b4dfb38b9f654716b6295032b'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  
  form!:FormGroup
  weather$!: Subscription
  result:Weather[]=[] // equivalent to result={}

  constructor(private fb:FormBuilder,private http:HttpClient){}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control('',[Validators.required])
    })
  }

  ngOnDestroy(): void {
    this.weather$.unsubscribe()
  }

  getWeather(){
    const city = this.form.value['city']
    console.info(`City: ${city}`)

    // const params = new HttpParams().set('q',city).set('appid',WEATHER_API_KEY)
    // this.http.get<any>(WEATHER_URL,{ params }) // if key & value same name, just write once

    // create query params
    const qs = new HttpParams().set('q',city).set('appid',WEATHER_API_KEY)

    // unsubscribe before subscribe
    if (this.weather$)
      this.weather$.unsubscribe()

    // returns an observable
    this.weather$ = this.http.get<Weather[]>(WEATHER_URL,{ params:qs })
    .pipe(
      map((v:any) => {
        const temp = v['main']['temp']
        const weather = v['weather'] as any[]
        return weather.map( w => {
          return {
            main:w['main'],
            description:w['description'],
            icon:w['icon'],
            temperature:temp
          }as Weather
        })
      })
    )
    .subscribe({
      next: v => {
        console.info('.....NEXT')
        this.result = v
      },
      error: err => {
        console.error('ERROR: ', err)
      },
      complete() {
          console.warn('......COMPLETE: ')
      },
    })
    
  }
}
