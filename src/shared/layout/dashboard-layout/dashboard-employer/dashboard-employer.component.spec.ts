import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardEmployerComponent } from '@shared/layout';

describe('DashboardEmployerComponent', () => {
  let component: DashboardEmployerComponent;
  let fixture: ComponentFixture<DashboardEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardEmployerComponent],
    });
    fixture = TestBed.createComponent(DashboardEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
