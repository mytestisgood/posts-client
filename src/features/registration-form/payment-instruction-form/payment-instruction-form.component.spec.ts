import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInstructionFormComponent } from '@feature';

describe('PayDirectlyComponent', () => {
  let component: PaymentInstructionFormComponent;
  let fixture: ComponentFixture<PaymentInstructionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentInstructionFormComponent],
    });
    fixture = TestBed.createComponent(PaymentInstructionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
