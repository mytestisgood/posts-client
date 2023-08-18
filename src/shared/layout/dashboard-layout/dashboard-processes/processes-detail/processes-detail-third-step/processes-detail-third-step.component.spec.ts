import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailThirdStepComponent } from '@shared/layout';

describe('ProcessesDetailThirdStepComponent', () => {
  let component: ProcessesDetailThirdStepComponent;
  let fixture: ComponentFixture<ProcessesDetailThirdStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailThirdStepComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
