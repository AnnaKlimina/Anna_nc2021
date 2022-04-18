import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarouselItemComponent } from './card-carousel-item.component';

describe('CardCarouselItemComponent', () => {
  let component: CardCarouselItemComponent;
  let fixture: ComponentFixture<CardCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCarouselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
