import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingLayoutComponent } from '@shared/layout';

describe('LandingLayoutComponent', () => {
  let component: LandingLayoutComponent;
  let fixture: ComponentFixture<LandingLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingLayoutComponent],
    });
    fixture = TestBed.createComponent(LandingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
