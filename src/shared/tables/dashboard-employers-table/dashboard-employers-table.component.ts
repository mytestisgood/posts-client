import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  FeedbacksGetTransferResponse,
  StatusFileFeedback,
  StatusProcess,
} from '@shared/api/models';
import { FeedBackService } from '@shared/api/services';
import { FeedbackTransferDialogComponent } from '@shared/dialog';
import { RecordListItems } from '@shared/entities';
import { getCalendarDateFromStringDate } from '@shared/helpers';
import { NoElementsToShowComponent } from '@shared/layout';
import { DestroyService } from '@shared/services';
import {
  ChangePageItemsValue,
  InputCheckboxComponent,
  LoaderComponent,
  TablePaginationComponent,
} from '@shared/ui';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-employers-table',
  standalone: true,
  imports: [
    CommonModule, InputCheckboxComponent, TablePaginationComponent,
    FeedbackTransferDialogComponent, LoaderComponent, NoElementsToShowComponent,
  ],
  templateUrl: './dashboard-employers-table.component.html',
  styleUrls: ['./dashboard-employers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployersTableComponent {
  @Input() public items!: RecordListItems[] | null;

  public itemsValue: ChangePageItemsValue = { firstValue: 0, lastValue: 4 };
  public allSelectedValue: FormControl<boolean | null> = new FormControl<boolean>(false);
  protected readonly getDateFromStringDate = getCalendarDateFromStringDate;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly feedBackService: FeedBackService,
  ) {
  }

  public checkRow(isSelected: boolean, index: number): void {
    if (!this.items) {
      return;
    }

    this.items[index].isSelected.setValue(isSelected);
    this.isSelectedAll(this.items.every(item => item.isSelected.value) ?? false);
  }

  public checkAll(isSelected: boolean): void {
    this.items?.forEach(item => (item.isSelected.setValue(isSelected)));
    this.isSelectedAll(isSelected);
  }

  public isSelectedAll(isSelected: boolean): void {
    if (isSelected) {
      this.allSelectedValue.setValue(true);
    } else {
      this.allSelectedValue.setValue(false);
    }
  }

  public openFeedbackTransferDialog(
    companyName: string | undefined,
    identifier: string | undefined,
    fileStatus: StatusProcess | undefined,
  ): void {
    const newFileStatus: StatusFileFeedback = fileStatus as StatusFileFeedback;

    this.feedBackService.apiFeedbacksGetTransferGet({
      departmentId: identifier,
      mtbId: '',
      sentGroupId: newFileStatus,
    }).pipe(
      switchMap((response: FeedbacksGetTransferResponse) => {
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

  public onChangeSliceOfPage(value: ChangePageItemsValue): void {
    if (value.lastValue !== undefined) {
      this.itemsValue = { firstValue: value.firstValue, lastValue: value.lastValue };
    }
  }
}
