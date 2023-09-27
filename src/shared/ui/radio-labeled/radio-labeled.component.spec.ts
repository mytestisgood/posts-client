import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioLabeledComponent } from '@shared/ui';

describe('RadioComponent', () => {
  let component: RadioLabeledComponent;
  let fixture: ComponentFixture<RadioLabeledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioLabeledComponent],
    });
    fixture = TestBed.createComponent(RadioLabeledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
