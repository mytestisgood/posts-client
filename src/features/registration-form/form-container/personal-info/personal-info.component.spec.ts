import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalInfoComponent } from '@feature';

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoComponent;
  let fixture: ComponentFixture<PersonalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalInfoComponent],
    });
    fixture = TestBed.createComponent(PersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
