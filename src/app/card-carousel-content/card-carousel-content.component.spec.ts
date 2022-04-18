import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarouselContentComponent } from './card-carousel-content.component';

describe('CardCarouselContentComponent', () => {
  let component: CardCarouselContentComponent;
  let fixture: ComponentFixture<CardCarouselContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCarouselContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCarouselContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
