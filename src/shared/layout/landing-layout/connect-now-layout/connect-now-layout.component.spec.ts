import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectNowLayoutComponent } from '@shared/layout';

describe('ConnectNowBannerComponent', () => {
  let component: ConnectNowLayoutComponent;
  let fixture: ComponentFixture<ConnectNowLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConnectNowLayoutComponent],
    });
    fixture = TestBed.createComponent(ConnectNowLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
