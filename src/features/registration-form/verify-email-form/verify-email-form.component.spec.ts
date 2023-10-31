import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyEmailFormComponent } from '@feature';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailFormComponent;
  let fixture: ComponentFixture<VerifyEmailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VerifyEmailFormComponent],
    });
    fixture = TestBed.createComponent(VerifyEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
