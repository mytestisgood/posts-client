import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayotPopupComponent } from './main-layout-popup.component';

describe('MainLayotPopupComponent', () => {
  let component: MainLayotPopupComponent;
  let fixture: ComponentFixture<MainLayotPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayotPopupComponent]
    });
    fixture = TestBed.createComponent(MainLayotPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
