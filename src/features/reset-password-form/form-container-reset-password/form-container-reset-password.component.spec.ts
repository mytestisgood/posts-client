import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormContainerResetPasswordComponent } from '@feature';

describe('FormContainerResetPasswordComponent', () => {
  let component: FormContainerResetPasswordComponent;
  let fixture: ComponentFixture<FormContainerResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormContainerResetPasswordComponent],
    });
    fixture = TestBed.createComponent(FormContainerResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
