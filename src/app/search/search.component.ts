import { Component, OnInit } from '@angular/core';

import { Service } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit {
  logo?: Service;

  constructor(private yandexService: YandexService) {}

  get() {
    this.yandexService
      .getYandexLogo()
      .subscribe((result) => (this.logo = result));
  }

  ngOnInit(): void {
    this.get();
  }
}
