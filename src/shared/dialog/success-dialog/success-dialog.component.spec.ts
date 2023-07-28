import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessDialogComponent } from '@shared/dialog';

describe('SuccessDialogComponent', () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuccessDialogComponent],
    });
    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
