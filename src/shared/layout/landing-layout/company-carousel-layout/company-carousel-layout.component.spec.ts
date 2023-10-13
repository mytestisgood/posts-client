import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyCarouselLayoutComponent } from '@shared/layout';

describe('CompanySliderLayoutComponent', () => {
  let component: CompanyCarouselLayoutComponent;
  let fixture: ComponentFixture<CompanyCarouselLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanyCarouselLayoutComponent],
    });
    fixture = TestBed.createComponent(CompanyCarouselLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
