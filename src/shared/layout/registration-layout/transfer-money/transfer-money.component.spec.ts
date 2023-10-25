import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMoneyComponent } from '@shared/layout';

describe('TransferMoneyComponent', () => {
  let component: TransferMoneyComponent;
  let fixture: ComponentFixture<TransferMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransferMoneyComponent],
    });
    fixture = TestBed.createComponent(TransferMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
