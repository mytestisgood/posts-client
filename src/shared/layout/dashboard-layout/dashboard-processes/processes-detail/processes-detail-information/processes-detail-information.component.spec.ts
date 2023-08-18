import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailInformationComponent } from '@shared/layout';

describe('ProcessesDetailInformationComponent', () => {
  let component: ProcessesDetailInformationComponent;
  let fixture: ComponentFixture<ProcessesDetailInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailInformationComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
