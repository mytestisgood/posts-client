import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardInquiriesComponent } from '@shared/layout';

describe('DashboardInquiriesComponent', () => {
  let component: DashboardInquiriesComponent;
  let fixture: ComponentFixture<DashboardInquiriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardInquiriesComponent],
    });
    fixture = TestBed.createComponent(DashboardInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
