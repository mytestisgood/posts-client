import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeSmallTableComponent } from '@shared/tables';

describe('DashboardHomeSmallTableComponent', () => {
  let component: DashboardHomeSmallTableComponent;
  let fixture: ComponentFixture<DashboardHomeSmallTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardHomeSmallTableComponent],
    });
    fixture = TestBed.createComponent(DashboardHomeSmallTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
