import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayBySmartiComponent } from '@feature';

describe('PayBySmartiComponent', () => {
  let component: PayBySmartiComponent;
  let fixture: ComponentFixture<PayBySmartiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PayBySmartiComponent],
    });
    fixture = TestBed.createComponent(PayBySmartiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
