import { Component, OnInit } from '@angular/core';
import { Service } from '../interface';

@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.less'],
})
export class AdvertismentComponent implements OnInit {
  advertisment: Service = {
    id: -1,
    link: 'https://cloud.yandex.ru/cloud-boost?&utm_source=yamainbanner&utm_medium=app_developers&yclid=7182004421740778459',
    icon: 'https://yastatic.net/www/_/7FLKDd647/4a7467XOP/N6RpnxpJyT0QpNRcBRsj8mEZqOTvxrJgzsTiSHrSoS8puBlIKrw7KAueLcJfBF0QwWk4tIA1YcQOpSupmswT1zu06O6XwKk1uaDc0XQfX8Yw3TBkU15avT5Yar3-qrEyTaxtJDOIUggbRtw',
  };

  constructor() {}

  ngOnInit(): void {}
}
