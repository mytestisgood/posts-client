import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadsDialogComponent } from '@shared/dialog';

describe('LeadsDialogComponent', () => {
  let component: LeadsDialogComponent;
  let fixture: ComponentFixture<LeadsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeadsDialogComponent],
    });
    fixture = TestBed.createComponent(LeadsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
