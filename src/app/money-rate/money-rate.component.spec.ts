import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRateComponent } from './money-rate.component';

describe('MoneyRateComponent', () => {
  let component: MoneyRateComponent;
  let fixture: ComponentFixture<MoneyRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
