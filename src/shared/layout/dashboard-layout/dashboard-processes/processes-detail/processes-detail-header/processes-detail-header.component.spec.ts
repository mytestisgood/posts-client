import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessesDetailHeaderComponent } from '@shared/layout';

describe('ProcessesDetailHeaderComponent', () => {
  let component: ProcessesDetailHeaderComponent;
  let fixture: ComponentFixture<ProcessesDetailHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProcessesDetailHeaderComponent],
    });
    fixture = TestBed.createComponent(ProcessesDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
