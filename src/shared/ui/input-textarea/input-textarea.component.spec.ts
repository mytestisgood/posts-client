import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextareaComponent } from '@shared/ui';

describe('InputTextareaComponent', () => {
  let component: InputTextareaComponent;
  let fixture: ComponentFixture<InputTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputTextareaComponent],
    });
    fixture = TestBed.createComponent(InputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
