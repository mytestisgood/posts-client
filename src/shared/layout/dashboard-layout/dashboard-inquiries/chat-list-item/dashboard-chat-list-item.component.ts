import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardChatItem, setLineColorClass } from '@shared/entities';
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
  @Input() public chatsItems!: DashboardChatItem[];
  @Output() public activeChatIdChange: EventEmitter<number> = new EventEmitter<number>();

  protected readonly setLineColorClass = setLineColorClass;

  public chatActiveChange(id: number): void {
    this.activeChatIdChange.next(id);
  }
}
