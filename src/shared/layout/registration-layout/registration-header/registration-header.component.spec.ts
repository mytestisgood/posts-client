import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationHeaderComponent } from './registration-header.component';

describe('RegistrationHeaderComponent', () => {
  let component: RegistrationHeaderComponent;
  let fixture: ComponentFixture<RegistrationHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationHeaderComponent]
    });
    fixture = TestBed.createComponent(RegistrationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
