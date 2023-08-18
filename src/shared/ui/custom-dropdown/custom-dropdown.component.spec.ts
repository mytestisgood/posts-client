import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDropdownComponent } from '@shared/ui';

describe('CustomDropdownComponent', () => {
  let component: CustomDropdownComponent;
  let fixture: ComponentFixture<CustomDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomDropdownComponent],
    });
    fixture = TestBed.createComponent(CustomDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
