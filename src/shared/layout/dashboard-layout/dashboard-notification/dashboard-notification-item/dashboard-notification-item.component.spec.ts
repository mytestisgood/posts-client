import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotificationItemComponent } from '@shared/layout';

describe('DashboardNotificationItemComponent', () => {
  let component: DashboardNotificationItemComponent;
  let fixture: ComponentFixture<DashboardNotificationItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardNotificationItemComponent],
    });
    fixture = TestBed.createComponent(DashboardNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
