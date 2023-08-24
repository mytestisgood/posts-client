import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { AddFileChatDialogComponent } from '@shared/dialog';
import {
  DashboardChatAddFileGroupControls,
  dashboardChatAddFileGroupMapper,
  DashboardChatItem, setLineColorClass,
} from '@shared/entities';
import { downloadFileHelper, formattedToDDMMYYYY } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent, InputTextareaComponent,
  SelectComponent,
} from '@shared/ui';
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

  public addAddFileForm: FormGroup<DashboardChatAddFileGroupControls> = dashboardChatAddFileGroupMapper();
  protected readonly setLineColorClass = setLineColorClass;

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
  ) {}
  public dateChatMessages(messagesDate: string): string {
    const formattedToday: string = formattedToDDMMYYYY();

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
}
