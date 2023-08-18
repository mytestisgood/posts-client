import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesDetailFourthStepComponent } from '@shared/layout';

describe('ProcessesDetailFourthStepComponent', () => {
  let component: ProcessesDetailFourthStepComponent;
  let fixture: ComponentFixture<ProcessesDetailFourthStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailFourthStepComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailFourthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
