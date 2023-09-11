import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCompensationsTableComponent } from '@shared/tables';

describe('DashboardBalanceTableComponent', () => {
  let component: DashboardCompensationsTableComponent;
  let fixture: ComponentFixture<DashboardCompensationsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardCompensationsTableComponent],
    });
    fixture = TestBed.createComponent(DashboardCompensationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
