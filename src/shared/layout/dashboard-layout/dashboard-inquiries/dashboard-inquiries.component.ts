import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chatItems, DashboardChatItem } from '@shared/entities';
import { ButtonComponent, CustomDropdownComponent } from '@shared/ui';
import {
  DashboardChatListComponent,
} from './chat-list/dashboard-chat-list.component';
import { DashboardChatWindowComponent } from './chat-window/dashboard-chat-window.component';

@Component({
  selector: 'smarti-dashboard-inquiries',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, DashboardChatWindowComponent,
    DashboardChatListComponent,
  ],
  templateUrl: './dashboard-inquiries.component.html',
  styleUrls: ['./dashboard-inquiries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardInquiriesComponent {
  public isCustomDropdownActive: boolean = false;
  public chatItems: DashboardChatItem[] = chatItems;
  public chatItem!: DashboardChatItem | undefined;
  private chatId!: number;

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }

  public changeCurrentChatId(chatId: number): void {
    this.chatId = chatId;
  }

  public currentActiveChat(): DashboardChatItem | undefined {
    if (this.chatId) {
      this.chatItem = this.chatItems.find(chat => chat.id === this.chatId);
      return this.chatItem;
    }
    return;
  }
}
