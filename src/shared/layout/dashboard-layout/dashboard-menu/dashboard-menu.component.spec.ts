import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuComponent } from '@shared/layout';

describe('DasgboardMenuComponent', () => {
  let component: DashboardMenuComponent;
  let fixture: ComponentFixture<DashboardMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardMenuComponent],
    });
    fixture = TestBed.createComponent(DashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
