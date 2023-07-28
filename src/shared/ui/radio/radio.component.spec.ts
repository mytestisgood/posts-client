import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from '@shared/ui';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioComponent],
    });
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
