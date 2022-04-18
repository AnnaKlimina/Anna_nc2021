import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../interface';

@Component({
  selector: 'app-card-carousel-header',
  templateUrl: './card-carousel-header.component.html',
  styleUrls: ['./card-carousel-header.component.less'],
})
export class CardCarouselHeaderComponent implements OnInit {
  @Input() content?: Card;

  constructor() {}

  ngOnInit(): void {}
}
