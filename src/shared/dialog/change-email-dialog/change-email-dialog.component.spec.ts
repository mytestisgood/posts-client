import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailDialogComponent } from '@shared/dialog';

describe('ChangeEmailDialogComponent', () => {
  let component: ChangeEmailDialogComponent;
  let fixture: ComponentFixture<ChangeEmailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeEmailDialogComponent],
    });
    fixture = TestBed.createComponent(ChangeEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
