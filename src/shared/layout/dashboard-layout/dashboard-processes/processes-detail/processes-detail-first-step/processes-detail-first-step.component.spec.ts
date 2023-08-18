import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailFirstStepComponent } from '@shared/layout';

describe('ProcessesDetailFirstStepComponent', () => {
  let component: ProcessesDetailFirstStepComponent;
  let fixture: ComponentFixture<ProcessesDetailFirstStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailFirstStepComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
