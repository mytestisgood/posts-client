import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailComponent } from '@shared/layout';

describe('ProcessesDetailComponent', () => {
  let component: ProcessesDetailComponent;
  let fixture: ComponentFixture<ProcessesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
