import { Component, OnInit } from '@angular/core';

import { Service } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less'],
})
export class ServicesComponent implements OnInit {
  serviceList?: Service[];

  constructor(private yandexService: YandexService) {}

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  getIconArray(value: string | string[] | undefined): string[] {
    let result: string[] = [];
    if (typeof value === 'object') {
      result = value;
    }
    return result;
  }

  get() {
    this.yandexService
      .getYandexService()
      .subscribe((list) => (this.serviceList = list));
  }

  ngOnInit(): void {
    this.get();
  }
}
