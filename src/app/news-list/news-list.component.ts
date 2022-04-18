import { Component, OnInit } from '@angular/core';

import { Service } from '../interface';

import { YandexService } from '../yandex.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.less'],
})
export class NewsListComponent implements OnInit {
  newsList?: Service[];

  constructor(private yandexService: YandexService) {}

  get() {
    this.yandexService
      .getNewsContent()
      .subscribe((newsContent) => (this.newsList = newsContent));
  }

  ngOnInit(): void {
    this.get();
  }
}
