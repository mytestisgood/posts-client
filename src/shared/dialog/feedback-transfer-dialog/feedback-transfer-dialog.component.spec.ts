import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackTransferDialogComponent } from '@shared/dialog';

describe('FeedbackTransferDialogComponent', () => {
  let component: FeedbackTransferDialogComponent;
  let fixture: ComponentFixture<FeedbackTransferDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackTransferDialogComponent],
    });
    fixture = TestBed.createComponent(FeedbackTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
