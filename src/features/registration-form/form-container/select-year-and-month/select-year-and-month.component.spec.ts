import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectYearAndMonthComponent } from './select-year-and-month.component';

describe('SelectYearAndMonthComponent', () => {
  let component: SelectYearAndMonthComponent;
  let fixture: ComponentFixture<SelectYearAndMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectYearAndMonthComponent]
    });
    fixture = TestBed.createComponent(SelectYearAndMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
