import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGroupSelectComponent } from '@shared/ui';

describe('CustomGroupSelectComponent', () => {
  let component: CustomGroupSelectComponent;
  let fixture: ComponentFixture<CustomGroupSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomGroupSelectComponent],
    });
    fixture = TestBed.createComponent(CustomGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
