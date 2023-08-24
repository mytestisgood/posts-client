import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFileChatDialogComponent } from '@shared/dialog';

describe('AddFileChatDialogComponent', () => {
  let component: AddFileChatDialogComponent;
  let fixture: ComponentFixture<AddFileChatDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddFileChatDialogComponent],
    });
    fixture = TestBed.createComponent(AddFileChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
