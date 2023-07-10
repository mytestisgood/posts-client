import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBannerLayoutComponent } from './main-banner-layout.component';

describe('MainBannerComponent', () => {
  let component: MainBannerLayoutComponent;
  let fixture: ComponentFixture<MainBannerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainBannerLayoutComponent]
    });
    fixture = TestBed.createComponent(MainBannerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
