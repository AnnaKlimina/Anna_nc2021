import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHeaderBlockComponent } from './news-header-block.component';

describe('NewsHeaderBlockComponent', () => {
  let component: NewsHeaderBlockComponent;
  let fixture: ComponentFixture<NewsHeaderBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsHeaderBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsHeaderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
