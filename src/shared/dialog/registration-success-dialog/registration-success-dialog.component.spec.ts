import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccessDialogComponent } from './registration-success-dialog.component';

describe('RigistrationSuccessDialogComponent', () => {
  let component: RegistrationSuccessDialogComponent;
  let fixture: ComponentFixture<RegistrationSuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationSuccessDialogComponent]
    });
    fixture = TestBed.createComponent(RegistrationSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
