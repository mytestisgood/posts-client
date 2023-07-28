import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutPopupComponent } from '@shared/popup';

describe('MainLayoutPopupComponent', () => {
  let component: MainLayoutPopupComponent;
  let fixture: ComponentFixture<MainLayoutPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutPopupComponent],
    });
    fixture = TestBed.createComponent(MainLayoutPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
