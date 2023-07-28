import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutLayoutComponent } from '@shared/layout';

describe('AboutComponent', () => {
  let component: AboutLayoutComponent;
  let fixture: ComponentFixture<AboutLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AboutLayoutComponent],
    });
    fixture = TestBed.createComponent(AboutLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
