import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardShieldTableComponent } from '@shared/tables';

describe('DashboardShieldTableComponent', () => {
  let component: DashboardShieldTableComponent;
  let fixture: ComponentFixture<DashboardShieldTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardShieldTableComponent],
    });
    fixture = TestBed.createComponent(DashboardShieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
