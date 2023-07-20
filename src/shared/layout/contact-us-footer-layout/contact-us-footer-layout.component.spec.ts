import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsFooterLayoutComponent } from '@shared/layout';

describe('LoginFooterComponent', () => {
  let component: ContactUsFooterLayoutComponent;
  let fixture: ComponentFixture<ContactUsFooterLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactUsFooterLayoutComponent]
    });
    fixture = TestBed.createComponent(ContactUsFooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
