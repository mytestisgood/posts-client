import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPaymentFormComponent } from '@feature';

describe('ConfirmPaymentFormComponent', () => {
  let component: ConfirmPaymentFormComponent;
  let fixture: ComponentFixture<ConfirmPaymentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmPaymentFormComponent],
    });
    fixture = TestBed.createComponent(ConfirmPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
