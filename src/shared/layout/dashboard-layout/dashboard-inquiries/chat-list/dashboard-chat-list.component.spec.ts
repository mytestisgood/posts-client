import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardChatListComponent } from '@shared/layout';

describe('ChatListComponent', () => {
  let component: DashboardChatListComponent;
  let fixture: ComponentFixture<DashboardChatListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardChatListComponent],
    });
    fixture = TestBed.createComponent(DashboardChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
