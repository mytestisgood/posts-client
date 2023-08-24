import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardChatWindowComponent } from '@shared/layout';

describe('ChatWindowComponent', () => {
  let component: DashboardChatWindowComponent;
  let fixture: ComponentFixture<DashboardChatWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardChatWindowComponent],
    });
    fixture = TestBed.createComponent(DashboardChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
