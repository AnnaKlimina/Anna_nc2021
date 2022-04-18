import { Component, OnInit } from '@angular/core';

import { YandexService } from '../yandex.service';

import { Card } from '../interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less'],
})
export class FeedComponent implements OnInit {
  cards?: Card[];

  constructor(private yandexService: YandexService) {}

  get() {
    this.yandexService.getFeed().subscribe((result) => (this.cards = result));
  }

  ngOnInit(): void {
    this.get();
  }
}
