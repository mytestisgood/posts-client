import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeTableComponent } from '@shared/tables';

describe('DashboardHomeTableComponent', () => {
  let component: DashboardHomeTableComponent;
  let fixture: ComponentFixture<DashboardHomeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardHomeTableComponent],
    });
    fixture = TestBed.createComponent(DashboardHomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
