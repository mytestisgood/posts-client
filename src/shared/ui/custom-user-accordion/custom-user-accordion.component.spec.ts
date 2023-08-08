import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserAccordionComponent } from '@shared/ui';

describe('CustomUserAccordionComponent', () => {
  let component: CustomUserAccordionComponent;
  let fixture: ComponentFixture<CustomUserAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomUserAccordionComponent],
    });
    fixture = TestBed.createComponent(CustomUserAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
