import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from '@shared/ui';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputFieldComponent],
    });
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
