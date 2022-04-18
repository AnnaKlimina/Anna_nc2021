import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarouselHeaderComponent } from './card-carousel-header.component';

describe('CardCarouselHeaderComponent', () => {
  let component: CardCarouselHeaderComponent;
  let fixture: ComponentFixture<CardCarouselHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCarouselHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCarouselHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
