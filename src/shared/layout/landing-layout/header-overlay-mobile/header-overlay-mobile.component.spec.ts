import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderOverlayMobileComponent } from '@shared/layout';

describe('HeaderOverlayMobileComponent', () => {
  let component: HeaderOverlayMobileComponent;
  let fixture: ComponentFixture<HeaderOverlayMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderOverlayMobileComponent],
    });
    fixture = TestBed.createComponent(HeaderOverlayMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
