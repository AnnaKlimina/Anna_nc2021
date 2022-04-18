import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardHeaderComponent } from './media-card-header.component';

describe('MediaCardHeaderComponent', () => {
  let component: MediaCardHeaderComponent;
  let fixture: ComponentFixture<MediaCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaCardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
