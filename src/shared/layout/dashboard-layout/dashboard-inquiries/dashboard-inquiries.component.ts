import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatService, InlineResponse20036, InlineResponse2007 } from '@shared/api';
import { CreateNewChatDialogComponent } from '@shared/dialog';
import {
  ChatListItems,
  DashboardCreateNewChatGroupControls,
  dashboardCreateNewChatGroupMapper,
  REGISTRATION_TOKEN,
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
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public chatItems$: Observable<ChatListItems[]> = this.chatService.apiChatsGet(
    'all',
    '',
    '',
    this.token,
  ).pipe(
    map((response: InlineResponse2007[]) => {
      return response.map((item: InlineResponse2007): ChatListItems => ({ ...item, active: false }));
    }),
  );
  public chat$!: Observable<InlineResponse20036 | null>;
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
    this.chat$ = this.chatService.apiChatsChatIdGet(chatId, this.token).pipe(
      map((response: InlineResponse20036) => {
        this.isLoadingChatWindow = false;
        return response ?? null;
      }),
    );
  }

  public onCreateNewChatSendRequest(opswatId: string): void {
    this.chatService.apiChatsPost(this.token, {
      chat: {
        content: this.createNewChatForm.value.referenceContent as string,
        employee_id: 0,
        salary_month: '',
        subject_id: this.createNewChatForm.value.document?.id,
        tat_subject_id: this.createNewChatForm.value.documentType?.id,
      },
      employer_id: 0,
      opswatIds: opswatId,
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
