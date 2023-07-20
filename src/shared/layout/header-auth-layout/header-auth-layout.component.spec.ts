import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthLayoutComponent } from '@shared/layout';

describe('LoginHeaderComponent', () => {
  let component: HeaderAuthLayoutComponent;
  let fixture: ComponentFixture<HeaderAuthLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderAuthLayoutComponent]
    });
    fixture = TestBed.createComponent(HeaderAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
