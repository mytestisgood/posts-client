import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockFeatureComponent } from './clock-feature.component';

describe('ClockFeatureComponent', () => {
  let component: ClockFeatureComponent;
  let fixture: ComponentFixture<ClockFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClockFeatureComponent]
    });
    fixture = TestBed.createComponent(ClockFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
