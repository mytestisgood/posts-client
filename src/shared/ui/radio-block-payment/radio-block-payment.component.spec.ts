import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioBlockPaymentComponent } from '@shared/ui';

describe('RadioBlockPaymentComponent', () => {
  let component: RadioBlockPaymentComponent;
  let fixture: ComponentFixture<RadioBlockPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioBlockPaymentComponent],
    });
    fixture = TestBed.createComponent(RadioBlockPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
