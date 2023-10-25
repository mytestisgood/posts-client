import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordComponent } from '@shared/layout';

describe('SetPasswordComponent', () => {
  let component: SetPasswordComponent;
  let fixture: ComponentFixture<SetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SetPasswordComponent],
    });
    fixture = TestBed.createComponent(SetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
