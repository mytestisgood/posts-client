import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAfterRegistrationComponent } from '@shared/layout';

describe('LoginAfterRegistrationComponent', () => {
  let component: LoginAfterRegistrationComponent;
  let fixture: ComponentFixture<LoginAfterRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginAfterRegistrationComponent],
    });
    fixture = TestBed.createComponent(LoginAfterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
