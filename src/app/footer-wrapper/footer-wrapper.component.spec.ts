import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWrapperComponent } from './footer-wrapper.component';

describe('FooterWrapperComponent', () => {
  let component: FooterWrapperComponent;
  let fixture: ComponentFixture<FooterWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
