import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaymentComponent } from '@shared/layout';

describe('ConfirmPaymentComponent', () => {
  let component: ConfirmPaymentComponent;
  let fixture: ComponentFixture<ConfirmPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmPaymentComponent],
    });
    fixture = TestBed.createComponent(ConfirmPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
