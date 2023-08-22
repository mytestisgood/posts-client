import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDocumentsTableComponent } from '@shared/tables';

describe('DashboardDocumentsTableComponent', () => {
  let component: DashboardDocumentsTableComponent;
  let fixture: ComponentFixture<DashboardDocumentsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardDocumentsTableComponent],
    });
    fixture = TestBed.createComponent(DashboardDocumentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
