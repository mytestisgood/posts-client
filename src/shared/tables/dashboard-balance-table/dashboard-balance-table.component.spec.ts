import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardBalanceTableComponent } from '@shared/tables';

describe('DashboardBalanceTableComponent', () => {
  let component: DashboardBalanceTableComponent;
  let fixture: ComponentFixture<DashboardBalanceTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardBalanceTableComponent],
    });
    fixture = TestBed.createComponent(DashboardBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
