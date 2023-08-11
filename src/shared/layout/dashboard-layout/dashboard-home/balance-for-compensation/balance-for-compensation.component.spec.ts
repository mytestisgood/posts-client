import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceForCompensationComponent } from '@shared/layout';

describe('BalanceForCompensationComponent', () => {
  let component: BalanceForCompensationComponent;
  let fixture: ComponentFixture<BalanceForCompensationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BalanceForCompensationComponent],
    });
    fixture = TestBed.createComponent(BalanceForCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
