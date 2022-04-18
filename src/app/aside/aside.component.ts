import { Component, OnInit } from '@angular/core';

import { Service } from '../interface';
import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.less'],
})
export class AsideComponent implements OnInit {
  constructor(private yandexService: YandexService) {}

  serviceList: Service[] = [];

  get(): void {
    this.yandexService
      .getServiceList()
      .subscribe((list) => (this.serviceList = list));
  }

  ngOnInit(): void {
    this.get();
  }
}
