import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDocumentsDialogComponent } from '@shared/dialog';

describe('AddDocumentsDialogComponent', () => {
  let component: AddDocumentsDialogComponent;
  let fixture: ComponentFixture<AddDocumentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddDocumentsDialogComponent],
    });
    fixture = TestBed.createComponent(AddDocumentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
