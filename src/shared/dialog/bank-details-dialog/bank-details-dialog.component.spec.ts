import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankDetailsDialogComponent } from '@shared/dialog';

describe('BankDetailsDialogComponent', () => {
  let component: BankDetailsDialogComponent;
  let fixture: ComponentFixture<BankDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BankDetailsDialogComponent],
    });
    fixture = TestBed.createComponent(BankDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
