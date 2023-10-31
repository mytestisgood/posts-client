import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountFormDialogComponent } from '@shared/dialog';

describe('AccountFormDialogComponent', () => {
  let component: AccountFormDialogComponent;
  let fixture: ComponentFixture<AccountFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccountFormDialogComponent],
    });
    fixture = TestBed.createComponent(AccountFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
