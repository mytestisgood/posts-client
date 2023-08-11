import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeComponent } from '@shared/layout';

describe('DashboardMainComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardHomeComponent],
    });
    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
