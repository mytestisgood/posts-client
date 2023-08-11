import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDownloadDocumentsComponent } from '@shared/layout';

describe('DashboardDownloadDocumentsComponent', () => {
  let component: DashboardDownloadDocumentsComponent;
  let fixture: ComponentFixture<DashboardDownloadDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardDownloadDocumentsComponent],
    });
    fixture = TestBed.createComponent(DashboardDownloadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
