import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../interface';

@Component({
  selector: 'app-card-carousel-content',
  templateUrl: './card-carousel-content.component.html',
  styleUrls: ['./card-carousel-content.component.less'],
})
export class CardCarouselContentComponent implements OnInit {
  @Input() content?: Card;

  constructor() {}

  scrollCarousel(value: number, element: any): void {
    if (value > 0) {
      value = Math.min(
        value / 2,
        element.scrollWidth - (element.scrollLeft + element.clientWidth)
      );
      element.scrollLeft += value;
    } else {
      value = Math.max(value / 2, -element.scrollLeft);
      element.scrollLeft += value;
    }
  }

  ngOnInit(): void {
    document.addEventListener('click', (event: any) => {
      if (event.target.closest('.card-carousel-content__button-next')) {
        let element = event.target
          .closest('.card-carousel-content')
          .querySelector('.card-carousel-content__carousel-grid');
        this.scrollCarousel(element.clientWidth, element);
      }
      if (event.target.closest('.card-carousel-content__button-prev')) {
        let element = event.target
          .closest('.card-carousel-content')
          .querySelector('.card-carousel-content__carousel-grid');
        this.scrollCarousel(-element.clientWidth, element);
      }
    });
  }
}
