import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewChatDialogComponent } from '@shared/dialog';

describe('AddFileChatDialogComponent', () => {
  let component: CreateNewChatDialogComponent;
  let fixture: ComponentFixture<CreateNewChatDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateNewChatDialogComponent],
    });
    fixture = TestBed.createComponent(CreateNewChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
