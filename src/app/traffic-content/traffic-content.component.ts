import { Component, OnInit } from '@angular/core';

import { Service, Media } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-traffic-content',
  templateUrl: './traffic-content.component.html',
  styleUrls: ['./traffic-content.component.less'],
})
export class TrafficContentComponent implements OnInit {
  trafficHeader: Service[] = [
    {
      link: 'https://yandex.ru/maps/213/moscow/probki',
      label: 'Пробки',
    },
    {
      link: 'https://yandex.ru/metro/moscow',
      label: 'Метро',
    },
    {
      link: 'https://rasp.yandex.ru/?utm_source=yamain&utm_medium=geoblock&utm_campaign=main',
      label: 'Расписания',
    },
  ];

  trafficContent?: Media;

  get() {
    this.yandexservice
      .getTrafficContent()
      .subscribe((result) => (this.trafficContent = result));
  }

  constructor(private yandexservice: YandexService) {}

  ngOnInit(): void {
    this.get();
  }
}
