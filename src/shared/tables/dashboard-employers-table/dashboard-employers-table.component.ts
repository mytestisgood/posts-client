import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeedBackService, InlineResponse20043,
  StatusFileFeedback,
  StatusProcess,
} from '@shared/api';
import { FeedbackTransferDialogComponent } from '@shared/dialog';
import { RecordListItems } from '@shared/entities';
import { getCalendarDateFromStringDate } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { InputCheckboxComponent, LoaderComponent, TablePaginationComponent } from '@shared/ui';
import { TuiDialogService } from '@taiga-ui/core';
import { switchMap, takeUntil } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'smarti-dashboard-employers-table',
  standalone: true,
  imports: [
    CommonModule, InputCheckboxComponent, TablePaginationComponent,
    FeedbackTransferDialogComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-employers-table.component.html',
  styleUrls: ['./dashboard-employers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployersTableComponent {
  @Input() public items!: RecordListItems[] | null;
  @Input() public token!: string;

  protected readonly getDateFromStringDate = getCalendarDateFromStringDate;
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly feedBackService: FeedBackService,
  ) {}

  public get isSelectedAll(): boolean {
    return this.items?.every(item => item.isSelected) ?? false;
  }

  public checkRow(isSelected: boolean, index: number): void {
    if (!this.items) {
      return;
    }

    this.items[index].isSelected = isSelected;
  }

  public checkAll(isSelected: boolean): void {
    this.items?.forEach(item => (item.isSelected = isSelected));
  }

  public openFeedbackTransferDialog(
    companyName: string | undefined,
    companyId: string | undefined,
    fileStatus: StatusProcess | undefined,
  ): void {
    const newFileStatus: StatusFileFeedback = fileStatus as StatusFileFeedback;

    this.feedBackService.apiFeedbacksGetTransferGet(
      companyId,
      newFileStatus,
      '',
      '',
      this.token,
    ).pipe(
      switchMap((response: InlineResponse20043) => {
        return this.dialogs.open(new PolymorpheusComponent(FeedbackTransferDialogComponent), {
          closeable: false,
          dismissible: false,
          size: 'auto',
          data: { transferData: response, companyName },
        });
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
