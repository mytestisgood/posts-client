import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsBannerLayoutComponent } from '@shared/layout';

describe('QuestionsBannerLayoutComponent', () => {
  let component: QuestionsBannerLayoutComponent;
  let fixture: ComponentFixture<QuestionsBannerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionsBannerLayoutComponent],
    });
    fixture = TestBed.createComponent(QuestionsBannerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
