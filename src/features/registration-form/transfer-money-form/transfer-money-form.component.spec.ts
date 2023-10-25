import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMoneyFormComponent } from '@feature';

describe('PaymentMethodComponent', () => {
  let component: TransferMoneyFormComponent;
  let fixture: ComponentFixture<TransferMoneyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransferMoneyFormComponent],
    });
    fixture = TestBed.createComponent(TransferMoneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
