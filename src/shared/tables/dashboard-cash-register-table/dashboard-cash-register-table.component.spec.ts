import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCashRegisterTableComponent } from '@shared/tables';

describe('DashboardCashRegisterTableComponent', () => {
  let component: DashboardCashRegisterTableComponent;
  let fixture: ComponentFixture<DashboardCashRegisterTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardCashRegisterTableComponent],
    });
    fixture = TestBed.createComponent(DashboardCashRegisterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
