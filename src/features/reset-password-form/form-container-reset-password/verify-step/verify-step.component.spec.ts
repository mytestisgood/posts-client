import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyStepComponent } from '@feature';

describe('VerifyStepComponent', () => {
  let component: VerifyStepComponent;
  let fixture: ComponentFixture<VerifyStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VerifyStepComponent],
    });
    fixture = TestBed.createComponent(VerifyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
