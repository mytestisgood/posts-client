import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodeComponent } from '@shared/layout';

describe('VerifyCodeComponent', () => {
  let component: VerifyCodeComponent;
  let fixture: ComponentFixture<VerifyCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VerifyCodeComponent],
    });
    fixture = TestBed.createComponent(VerifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
