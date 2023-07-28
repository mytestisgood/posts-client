import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCheckboxComponent } from '@shared/ui';

describe('InputCheckboxComponent', () => {
  let component: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputCheckboxComponent],
    });
    fixture = TestBed.createComponent(InputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
