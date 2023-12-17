import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVerifyTypeComponent } from './choose-verify-type.component';

describe('ChooseVerifyTypeComponent', () => {
  let component: ChooseVerifyTypeComponent;
  let fixture: ComponentFixture<ChooseVerifyTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChooseVerifyTypeComponent]
    });
    fixture = TestBed.createComponent(ChooseVerifyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
