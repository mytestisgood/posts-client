import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusChat } from '@shared/api';
import { ChatListItems, setLineColorClass } from '@shared/entities';
import { getCalendarDateFromStringDate } from '@shared/helpers';
import { TuiHintModule } from '@taiga-ui/core';

@Component({
  selector: 'smarti-dashboard-chat-list-item',
  standalone: true,
  imports: [CommonModule, TuiHintModule],
  templateUrl: './dashboard-chat-list-item.component.html',
  styleUrls: ['./dashboard-chat-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChatListItemComponent {
  @Input() public chatsItems!: ChatListItems[] | null;
  @Output() public activeChatIdChange: EventEmitter<number> = new EventEmitter<number>();

  protected readonly getDateFromStringDate = getCalendarDateFromStringDate;
  protected readonly setLineColorClass = setLineColorClass;

  public chatActiveChange(id: number | undefined): void {
    this.activeChatIdChange.next(id as number);
  }

  public chatListItemStatus(status: StatusChat | undefined): string {
    switch (status) {
      case 'open':
        return 'פתוח';
      case 'close':
        return 'סגור';
      case 'in_treatment':
        return 'בטיפול';
      default:
        return '';
    }
  }
}
