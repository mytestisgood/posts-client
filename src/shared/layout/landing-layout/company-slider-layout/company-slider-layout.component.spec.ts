import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanySliderLayoutComponent } from '@shared/layout';

describe('CompanySliderLayoutComponent', () => {
  let component: CompanySliderLayoutComponent;
  let fixture: ComponentFixture<CompanySliderLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanySliderLayoutComponent],
    });
    fixture = TestBed.createComponent(CompanySliderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
