import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPaymentComponent } from '@shared/layout';

describe('LastPaymentComponent', () => {
  let component: LastPaymentComponent;
  let fixture: ComponentFixture<LastPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LastPaymentComponent],
    });
    fixture = TestBed.createComponent(LastPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
