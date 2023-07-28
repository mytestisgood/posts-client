import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPhoneComponent } from '@shared/ui';

describe('InputPhoneComponent', () => {
  let component: InputPhoneComponent;
  let fixture: ComponentFixture<InputPhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputPhoneComponent],
    });
    fixture = TestBed.createComponent(InputPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
