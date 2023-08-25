import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardEmployersTableComponent } from '@shared/tables';

describe('DashboardEmployersTableComponent', () => {
  let component: DashboardEmployersTableComponent;
  let fixture: ComponentFixture<DashboardEmployersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardEmployersTableComponent],
    });
    fixture = TestBed.createComponent(DashboardEmployersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
