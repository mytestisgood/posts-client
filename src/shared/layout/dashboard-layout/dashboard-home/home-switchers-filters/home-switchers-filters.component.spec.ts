import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSwitchersFiltersComponent } from '@shared/layout';

describe('HomeSwitchersFiltersComponent', () => {
  let component: HomeSwitchersFiltersComponent;
  let fixture: ComponentFixture<HomeSwitchersFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeSwitchersFiltersComponent],
    });
    fixture = TestBed.createComponent(HomeSwitchersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
