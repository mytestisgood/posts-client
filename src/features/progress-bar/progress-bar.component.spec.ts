import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from '@feature';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
    });
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
