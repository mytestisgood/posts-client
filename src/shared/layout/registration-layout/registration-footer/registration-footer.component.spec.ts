import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFooterComponent } from './registration-footer.component';

describe('RegistrationFooterComponent', () => {
  let component: RegistrationFooterComponent;
  let fixture: ComponentFixture<RegistrationFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationFooterComponent]
    });
    fixture = TestBed.createComponent(RegistrationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
