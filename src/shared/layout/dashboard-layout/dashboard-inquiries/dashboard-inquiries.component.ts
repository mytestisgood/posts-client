import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatIdGetResponse, ChatResponse } from '@shared/api/models';
import { ChatService } from '@shared/api/services';
import { CreateNewChatDialogComponent } from '@shared/dialog';
import {
  ChatListItems,
  DashboardCreateNewChatGroupControls,
  dashboardCreateNewChatGroupMapper,
  TOKEN,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, CustomDropdownComponent, LoaderComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { map, Observable, takeUntil } from 'rxjs';
import { DashboardChatListComponent } from './chat-list/dashboard-chat-list.component';
import { DashboardChatWindowComponent } from './chat-window/dashboard-chat-window.component';

@Component({
  selector: 'smarti-dashboard-inquiries',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, DashboardChatWindowComponent,
    DashboardChatListComponent, CreateNewChatDialogComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-inquiries.component.html',
  styleUrls: ['./dashboard-inquiries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardInquiriesComponent {
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public chatItems$: Observable<ChatListItems[]> = this.chatService.apiChatsGet({
    token: this.token,
    status: 'all',
  }).pipe(
    map((response: ChatResponse[]) => {
      return response.map((item): ChatListItems => ({ ...item, active: false }));
    }),
  );
  public chat$!: Observable<ChatIdGetResponse | null>;
  public createNewChatForm: FormGroup<DashboardCreateNewChatGroupControls> = dashboardCreateNewChatGroupMapper();
  public isLoadingChatWindow: boolean = false;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly chatService: ChatService,
    private readonly localStorageService: LocalStorageService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }

  public changeCurrentChatId(chatId: number): void {
    this.isLoadingChatWindow = true;
    this.chat$ = this.chatService.apiChatsChatIdGet({
      chatId,
      token: this.token,
    }).pipe(
      map((response: ChatIdGetResponse) => {
        this.isLoadingChatWindow = false;
        return response ?? null;
      }),
    );
  }

  public onCreateNewChatSendRequest(opswatId: string): void {
    this.chatService.apiChatsPost({
      token: this.token,
      apiChatsBody: {
        chat: {
          content: this.createNewChatForm.value.referenceContent as string,
          employee_id: 0,
          salary_month: '',
          subject_id: this.createNewChatForm.value.document?.id,
          tat_subject_id: this.createNewChatForm.value.documentType?.id,
        },
        opswatIds: opswatId,
        employer_id: 0,
      },
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public openAddFileDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      dismissible: false,
      size: 'auto',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
