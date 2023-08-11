import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardBalanceComponent } from '@shared/layout';

describe('DashboardBalanceComponent', () => {
  let component: DashboardBalanceComponent;
  let fixture: ComponentFixture<DashboardBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardBalanceComponent],
    });
    fixture = TestBed.createComponent(DashboardBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
