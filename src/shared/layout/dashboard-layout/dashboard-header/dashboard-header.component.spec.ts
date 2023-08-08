import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeaderComponent } from '@shared/layout';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardHeaderComponent],
    });
    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
