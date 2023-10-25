import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadSampleDialogComponent } from '@shared/dialog';

describe('DownloadSampleDialogComponent', () => {
  let component: DownloadSampleDialogComponent;
  let fixture: ComponentFixture<DownloadSampleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DownloadSampleDialogComponent],
    });
    fixture = TestBed.createComponent(DownloadSampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
