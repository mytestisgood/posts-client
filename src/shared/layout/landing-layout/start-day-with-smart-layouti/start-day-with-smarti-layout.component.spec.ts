import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDayWithSmartiLayoutComponent } from './start-day-with-smarti-layout.component';

describe('StartDayWithSmartiComponent', () => {
  let component: StartDayWithSmartiLayoutComponent;
  let fixture: ComponentFixture<StartDayWithSmartiLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StartDayWithSmartiLayoutComponent]
    });
    fixture = TestBed.createComponent(StartDayWithSmartiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
