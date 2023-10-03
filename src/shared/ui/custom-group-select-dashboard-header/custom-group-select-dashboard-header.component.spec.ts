import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGroupSelectDashboardHeaderComponent } from '@shared/ui';

describe('CustomGroupSelectComponent', () => {
  let component: CustomGroupSelectDashboardHeaderComponent;
  let fixture: ComponentFixture<CustomGroupSelectDashboardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomGroupSelectDashboardHeaderComponent],
    });
    fixture = TestBed.createComponent(CustomGroupSelectDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
