import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyEmailComponent } from '@feature';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VerifyEmailComponent],
    });
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
