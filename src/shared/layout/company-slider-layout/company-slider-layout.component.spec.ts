import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCaruselLayoutComponent } from './company-slider-layout.component';

describe('CompanyCaruselComponent', () => {
  let component: CompanyCaruselLayoutComponent;
  let fixture: ComponentFixture<CompanyCaruselLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyCaruselLayoutComponent]
    });
    fixture = TestBed.createComponent(CompanyCaruselLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
