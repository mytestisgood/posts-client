import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodComponent } from '@feature';

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentMethodComponent],
    });
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
