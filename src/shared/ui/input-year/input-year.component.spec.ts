import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputYearComponent } from '@shared/ui';

describe('InputYearComponent', () => {
  let component: InputYearComponent;
  let fixture: ComponentFixture<InputYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputYearComponent],
    });
    fixture = TestBed.createComponent(InputYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
