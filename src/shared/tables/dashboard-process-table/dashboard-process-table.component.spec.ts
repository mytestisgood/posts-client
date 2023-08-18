import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardProcessTableComponent } from '@shared/tables';

describe('DashboardProcessTableComponent', () => {
  let component: DashboardProcessTableComponent;
  let fixture: ComponentFixture<DashboardProcessTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardProcessTableComponent],
    });
    fixture = TestBed.createComponent(DashboardProcessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
