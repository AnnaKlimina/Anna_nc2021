import { Component, OnInit } from '@angular/core';

import { Service, Media } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-weather-content',
  templateUrl: './weather-content.component.html',
  styleUrls: ['./weather-content.component.less'],
})
export class WeatherContentComponent implements OnInit {
  weatherHeader: Service[] = [
    {
      link: 'https://yandex.ru/pogoda/?utm_campaign=informer&utm_content=main_informer&utm_medium=web&utm_source=home&utm_term=title',
      label: 'Погода',
    },
    {
      link: 'https://yandex.ru/pogoda/maps/nowcast?utm_campaign=informer&utm_content=main_informer&utm_term=nowcast_link&utm_medium=web&utm_source=home',
      label: 'Карта осадков',
    },
  ];

  weatherContent?: Media[];

  get() {
    this.yandexService
      .getWeatherContent()
      .subscribe((result) => (this.weatherContent = result));
  }

  constructor(private yandexService: YandexService) {
    this.get();
  }

  ngOnInit(): void {}
}
