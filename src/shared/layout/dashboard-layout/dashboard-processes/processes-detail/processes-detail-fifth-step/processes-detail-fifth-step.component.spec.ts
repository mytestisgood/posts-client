import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailFifthStepComponent } from '@shared/layout';

describe('ProcessesDetailFifthStepComponent', () => {
  let component: ProcessesDetailFifthStepComponent;
  let fixture: ComponentFixture<ProcessesDetailFifthStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailFifthStepComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailFifthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
