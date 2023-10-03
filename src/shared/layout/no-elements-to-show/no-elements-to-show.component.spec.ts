import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoElementsToShowComponent } from '@shared/layout';

describe('DashboardNoElementsToShowComponent', () => {
  let component: NoElementsToShowComponent;
  let fixture: ComponentFixture<NoElementsToShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoElementsToShowComponent],
    });
    fixture = TestBed.createComponent(NoElementsToShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
