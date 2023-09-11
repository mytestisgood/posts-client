import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCompensationsComponent } from '@shared/layout';

describe('DashboardBalanceComponent', () => {
  let component: DashboardCompensationsComponent;
  let fixture: ComponentFixture<DashboardCompensationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardCompensationsComponent],
    });
    fixture = TestBed.createComponent(DashboardCompensationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
