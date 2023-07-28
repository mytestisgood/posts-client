import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputNumberComponent } from '@shared/ui';

describe('InputNumberComponent', () => {
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputNumberComponent],
    });
    fixture = TestBed.createComponent(InputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
