import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDateComponent } from '@shared/ui';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputDateComponent],
    });
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
