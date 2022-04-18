import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficContentComponent } from './traffic-content.component';

describe('TrafficContentComponent', () => {
  let component: TrafficContentComponent;
  let fixture: ComponentFixture<TrafficContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
