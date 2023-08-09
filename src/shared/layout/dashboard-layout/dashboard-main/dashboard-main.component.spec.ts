import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainComponent } from '@shared/layout';

describe('DashboardMainComponent', () => {
  let component: DashboardMainComponent;
  let fixture: ComponentFixture<DashboardMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardMainComponent],
    });
    fixture = TestBed.createComponent(DashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
