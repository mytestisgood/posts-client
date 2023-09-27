import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioBlockComponent } from '@shared/ui';

describe('RadioComponent', () => {
  let component: RadioBlockComponent;
  let fixture: ComponentFixture<RadioBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioBlockComponent],
    });
    fixture = TestBed.createComponent(RadioBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
