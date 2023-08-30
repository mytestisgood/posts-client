import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '@shared/api';
import { AddFileChatDialogComponent } from '@shared/dialog';
import {
  DashboardChatAddFileGroupControls,
  dashboardChatAddFileGroupMapper,
  DashboardChatItem, REGISTRATION_TOKEN, setLineColorClass,
} from '@shared/entities';
import { downloadFileHelper, formattedCurrentDateTo } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent, InputTextareaComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService, TuiScrollbarModule } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-chat-window',
  standalone: true,
  imports: [
    CommonModule, InputFieldComponent, TuiScrollbarModule, ButtonComponent,
    InputFileComponent, SelectComponent, InputTextareaComponent, AddFileChatDialogComponent,
  ],
  templateUrl: './dashboard-chat-window.component.html',
  styleUrls: ['./dashboard-chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChatWindowComponent {
  @Input() public chat!: DashboardChatItem | undefined;

  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public messageControl: FormControl = new FormControl();
  public addAddFileForm: FormGroup<DashboardChatAddFileGroupControls> = dashboardChatAddFileGroupMapper();
  protected readonly setLineColorClass = setLineColorClass;

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly chatService: ChatService,
    private readonly localStorageService: LocalStorageService,
  ) {}
  public dateChatMessages(messagesDate: string): string {
    const formattedToday: string = formattedCurrentDateTo('dd-mm-yyyy');

    if (formattedToday === messagesDate) {
      return 'today';
    }

    return messagesDate;
  }

  public downloadPaymentExample(name: string | null): void {
    downloadFileHelper('/assets/files/דוגמה.xlsx', name ?? 'unnamed');
  }

  public openAddFileDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      dismissible: false,
      size: 'auto',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public onAddFileSendRequest(): void {
    this.addAddFileForm.markAsTouched();
  }

  public onSendMessage(): void {
    this.chatService.apiChatsSaveMessageChatPost(this.token, {
        chat_id: 0,
        message: this.messageControl.value,
        employer_id: 0,
        opswatIds: '',
      }
    ).pipe(takeUntil(this.destroy$)).subscribe()
  }
}
