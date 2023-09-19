import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserMenuComponent } from '@shared/ui';

describe('CustomUserAccordionComponent', () => {
  let component: CustomUserMenuComponent;
  let fixture: ComponentFixture<CustomUserMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomUserMenuComponent],
    });
    fixture = TestBed.createComponent(CustomUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
