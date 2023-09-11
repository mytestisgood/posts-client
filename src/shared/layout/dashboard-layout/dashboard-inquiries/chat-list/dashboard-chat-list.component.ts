import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatListItems } from '@shared/entities';
import { LoaderComponent, TabsComponent } from '@shared/ui';
import {
  DashboardChatListItemComponent,
} from '../chat-list-item/dashboard-chat-list-item.component';

@Component({
  selector: 'smarti-dashboard-chat-list',
  standalone: true,
  imports: [CommonModule, TabsComponent, DashboardChatListItemComponent, LoaderComponent],
  templateUrl: './dashboard-chat-list.component.html',
  styleUrls: ['./dashboard-chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChatListComponent {
  @Input() public chatItems!: ChatListItems[] | null;
  @Output() public changeCurrentChatId: EventEmitter<number> = new EventEmitter<number>();
  public filteredChatItems!: ChatListItems[] | null;
  public activeItemIndex: number = 3;

  public setChatActive(id: number): void {
    this.changeCurrentChatId.next(id);
    this.chatItems?.forEach(chat => chat.active = chat.id === id);
  }

  public onFilteredChatItems(type: string): ChatListItems[] | null {
    if (type === 'all') {
      return this.filteredChatItems = this.chatItems;
    }

    return this.filteredChatItems = this.chatItems?.filter(chat => chat.status === type) ?? null;
  }

  public onChangeActiveTabIndex(activeTabIndex: number): void {
    this.activeItemIndex = activeTabIndex;
  }
}
