import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatIdGetResponse, ChatResponse } from '@shared/api/models';
import { ChatService } from '@shared/api/services';
import { CreateNewChatDialogComponent } from '@shared/dialog';
import {
  ChatListItems,
  DashboardCreateNewChatGroupControls,
  dashboardCreateNewChatGroupMapper,
  DashboardHeaderIds,
} from '@shared/entities';
import { DataSharingService, DestroyService } from '@shared/services';
import { ButtonComponent, CustomDropdownComponent, LoaderComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { filter, map, Observable, switchMap, takeUntil } from 'rxjs';
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
export class DashboardInquiriesComponent implements OnInit {
  public isCustomDropdownActive: boolean = false;
  public chatItems$!: Observable<ChatListItems[]>;
  public chat$!: Observable<ChatIdGetResponse | null>;
  public createNewChatForm: FormGroup<DashboardCreateNewChatGroupControls> = dashboardCreateNewChatGroupMapper();
  public isLoadingChatWindow: boolean = false;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly chatService: ChatService,
    private readonly destroy$: DestroyService,
    private readonly dataSharingService: DataSharingService,
  ) {
  }

  public ngOnInit(): void {
    this.chatItems$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter(value => !!value.organizationId),
      switchMap((value: DashboardHeaderIds) => {
        return this.chatService.apiChatsGet({
          status: 'all',
          organizationId: value.organizationId as string,
          employerId: value.employerId as string,
        }).pipe(
          map((response: ChatResponse[]) => {
            return response.map((item): ChatListItems => ({ ...item, active: false }));
          }),
        );
      }),
    );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }

  public changeCurrentChatId(chatId: number): void {
    this.isLoadingChatWindow = true;
    this.chat$ = this.chatService.apiChatsChatIdGet(chatId).pipe(
      map((response: ChatIdGetResponse) => {
        this.isLoadingChatWindow = false;
        return response ?? null;
      }),
    );
  }

  public onCreateNewChatSendRequest(opswatId: string): void {
    const employerId = this.dataSharingService.dashboardHeaderIds.value.employerId as string;

    this.chatService.apiChatsPost({
      chat: {
        content: this.createNewChatForm.value.referenceContent as string,
        employee_id: 0,
        salary_month: '',
        subject_id: this.createNewChatForm.value.document?.id,
        tat_subject_id: this.createNewChatForm.value.documentType?.id,
      },
      opswatIds: opswatId,
      employer_id: Number(employerId),
      message: '',
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
