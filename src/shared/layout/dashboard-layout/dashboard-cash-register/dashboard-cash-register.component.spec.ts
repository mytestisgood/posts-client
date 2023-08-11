import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCashRegisterComponent } from '@shared/layout';

describe('DashboardCashRegisterComponent', () => {
  let component: DashboardCashRegisterComponent;
  let fixture: ComponentFixture<DashboardCashRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardCashRegisterComponent],
    });
    fixture = TestBed.createComponent(DashboardCashRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
