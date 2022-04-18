import { Component, OnInit, Input } from '@angular/core';

import { Channel } from '../interface';

@Component({
  selector: 'app-card-carousel-item',
  templateUrl: './card-carousel-item.component.html',
  styleUrls: ['./card-carousel-item.component.less'],
})
export class CardCarouselItemComponent implements OnInit {
  @Input() content?: Channel;

  constructor() {}

  ngOnInit(): void {}
}
