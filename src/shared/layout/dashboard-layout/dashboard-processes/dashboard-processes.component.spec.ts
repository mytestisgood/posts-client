import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProcessesComponent } from '@shared/layout';

describe('DashboardProcessesComponent', () => {
  let component: DashboardProcessesComponent;
  let fixture: ComponentFixture<DashboardProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardProcessesComponent],
    });
    fixture = TestBed.createComponent(DashboardProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
