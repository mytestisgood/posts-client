import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDocumentsComponent } from '@shared/layout';

describe('DashboardDocumentsComponent', () => {
  let component: DashboardDocumentsComponent;
  let fixture: ComponentFixture<DashboardDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardDocumentsComponent],
    });
    fixture = TestBed.createComponent(DashboardDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
