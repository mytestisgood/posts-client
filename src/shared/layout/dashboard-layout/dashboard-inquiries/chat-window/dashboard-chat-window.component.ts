import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatIdGetResponse, UploadPostResponse } from '@shared/api/models';
import { ChatService, FilesMyHrService } from '@shared/api/services';
import { CreateNewChatDialogComponent } from '@shared/dialog';
import { setLineColorClass } from '@shared/entities';
import {
  downloadFileHelper,
  formattedCurrentDateTo,
  getDateFromStringIsoDate,
  getTimeFromStringIsoDate,
} from '@shared/helpers';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent,
  InputTextareaComponent,
  LoaderComponent,
  SelectComponent,
} from '@shared/ui';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-chat-window',
  standalone: true,
  imports: [
    CommonModule, InputFieldComponent, TuiScrollbarModule, ButtonComponent,
    InputFileComponent, SelectComponent, InputTextareaComponent, CreateNewChatDialogComponent,
    ReactiveFormsModule, LoaderComponent,
  ],
  templateUrl: './dashboard-chat-window.component.html',
  styleUrls: ['./dashboard-chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChatWindowComponent {
  @Input() public chat!: ChatIdGetResponse | null;

  public messageControl: FormControl = new FormControl();
  public uploadedFileId!: string;
  public isFileUploaded: boolean = true;
  protected readonly setLineColorClass = setLineColorClass;
  protected readonly getTimeFromStringIsoDate = getTimeFromStringIsoDate;

  constructor(
    private readonly destroy$: DestroyService,
    private readonly chatService: ChatService,
    private readonly filesMyHrService: FilesMyHrService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public dateChatMessages(messagesDate: string | undefined): string {
    const formattedToday: string = formattedCurrentDateTo('dd-mm-yyyy');
    const messageDateAsSting: string = getDateFromStringIsoDate('dd-mm-yyyy', messagesDate);

    if (formattedToday === messageDateAsSting) {
      return 'today';
    }

    return messageDateAsSting as string;
  }

  public downloadPaymentExample(name: string | undefined): void {
    downloadFileHelper('/assets/files/דוגמה.xlsx', name ?? 'unnamed');
  }

  public onSendMessage(chatId: string | undefined | number, employerId: string | undefined | number): void {
    this.chatService.apiChatsSaveMessageChatPost({
      chat_id: chatId as number,
      message: this.messageControl.value,
      employer_id: employerId as number,
      opswatIds: this.uploadedFileId,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public addFileToMessage(): void {
    document?.getElementById('fileId')?.click();
  }

  public onFileChangeEvent(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file: File = input.files[0];

    this.isFileUploaded = false;
    this.filesMyHrService.apiUploadPost({ file }).pipe(
      takeUntil(this.destroy$),
    ).subscribe((response: UploadPostResponse) => {
      this.isFileUploaded = true;
      this.uploadedFileId = response.opswatId as string;
      this.changeDetectorRef.detectChanges();
    });
  }
}
