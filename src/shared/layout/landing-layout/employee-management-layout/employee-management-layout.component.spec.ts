import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeManagementLayoutComponent } from '@shared/layout';

describe('EmployeeManagementLayoutComponent', () => {
  let component: EmployeeManagementLayoutComponent;
  let fixture: ComponentFixture<EmployeeManagementLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeManagementLayoutComponent],
    });
    fixture = TestBed.createComponent(EmployeeManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
