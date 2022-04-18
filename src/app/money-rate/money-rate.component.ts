import { Component, OnInit } from '@angular/core';

import { Rate } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-money-rate',
  templateUrl: './money-rate.component.html',
  styleUrls: ['./money-rate.component.less'],
})
export class MoneyRateComponent implements OnInit {
  rateList: Rate[] = [];

  constructor(private yandexService: YandexService) {}

  get() {
    this.yandexService
      .getMoneyRate()
      .subscribe((result) => (this.rateList = result));
  }

  ngOnInit(): void {
    this.get();
  }
}
