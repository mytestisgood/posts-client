import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationInfoComponent } from '@shared/layout';

describe('RegistrationInfoComponent', () => {
  let component: RegistrationInfoComponent;
  let fixture: ComponentFixture<RegistrationInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrationInfoComponent],
    });
    fixture = TestBed.createComponent(RegistrationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
