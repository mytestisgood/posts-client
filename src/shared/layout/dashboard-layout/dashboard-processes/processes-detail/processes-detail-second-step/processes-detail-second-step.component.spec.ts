import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailSecondStepComponent } from '@shared/layout';

describe('ProcessesDetailSecondStepComponent', () => {
  let component: ProcessesDetailSecondStepComponent;
  let fixture: ComponentFixture<ProcessesDetailSecondStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailSecondStepComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
