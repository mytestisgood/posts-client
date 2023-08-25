import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDownloadDocumentsGridTableComponent } from '@shared/tables';

describe('DashboardDownloadDocumentsGridTableComponent', () => {
  let component: DashboardDownloadDocumentsGridTableComponent;
  let fixture: ComponentFixture<DashboardDownloadDocumentsGridTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardDownloadDocumentsGridTableComponent],
    });
    fixture = TestBed.createComponent(DashboardDownloadDocumentsGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
