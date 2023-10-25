import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInstructionComponent } from '@shared/layout';

describe('PaymentInstructionComponent', () => {
  let component: PaymentInstructionComponent;
  let fixture: ComponentFixture<PaymentInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentInstructionComponent],
    });
    fixture = TestBed.createComponent(PaymentInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
