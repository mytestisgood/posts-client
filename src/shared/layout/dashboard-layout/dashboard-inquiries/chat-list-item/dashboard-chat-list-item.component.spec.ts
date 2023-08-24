import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardChatListItemComponent } from '@shared/layout';

describe('ChatListItemComponent', () => {
  let component: DashboardChatListItemComponent;
  let fixture: ComponentFixture<DashboardChatListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardChatListItemComponent],
    });
    fixture = TestBed.createComponent(DashboardChatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
