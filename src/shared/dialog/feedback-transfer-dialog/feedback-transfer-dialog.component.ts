import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FeedbacksGetTransferResponse } from '@shared/api/models';
import { DialogConfig } from '@shared/entities';
import { TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'smarti-feedback-transfer-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-transfer-dialog.component.html',
  styleUrls: ['./feedback-transfer-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackTransferDialogComponent implements OnInit {
  @Input() public observer!: { complete: () => void };
  public transferData!: FeedbacksGetTransferResponse | null;
  public companyName!: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public context: TuiDialog<DialogConfig<{
      transferData: FeedbacksGetTransferResponse | null,
      companyName: string,
    }>, void>,
  ) {}

  public ngOnInit(): void {
    this.transferData = this.context.data?.transferData as FeedbacksGetTransferResponse;
    this.companyName = this.context.data?.companyName as string;
  }

  public closeDialog(): void {
    this.context.$implicit.complete();
  }
}
