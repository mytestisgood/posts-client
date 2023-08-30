import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '@shared/api';
import { chatItems, DashboardChatItem, REGISTRATION_TOKEN } from '@shared/entities';
import { ButtonComponent, CustomDropdownComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { Observable } from 'rxjs';
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
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public chatItems$: Observable<object[]> = this.chatService.apiChatsGet();
  public chatItems: DashboardChatItem[] = chatItems;
  public chatItem!: DashboardChatItem | undefined;
  private chatId!: number;

  constructor(
    private readonly chatService: ChatService,
    private readonly localStorageService: LocalStorageService,
  ) {}

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
