import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardShieldComponent } from '@shared/layout';

describe('DashboardShieldComponent', () => {
  let component: DashboardShieldComponent;
  let fixture: ComponentFixture<DashboardShieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardShieldComponent],
    });
    fixture = TestBed.createComponent(DashboardShieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
