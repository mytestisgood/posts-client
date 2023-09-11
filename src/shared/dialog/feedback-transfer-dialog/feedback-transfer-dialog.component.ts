import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20043 } from '@shared/api';
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
  public transferData!: InlineResponse20043 | null;
  public companyName!: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public context: TuiDialog<DialogConfig<{
      transferData: InlineResponse20043 | null,
      companyName: string,
    }>, void>,
  ) {}

  public ngOnInit(): void {
    this.transferData = this.context.data?.transferData as InlineResponse20043;
    this.companyName = this.context.data?.companyName as string;
  }

  public closeDialog(): void {
    this.context.$implicit.complete();
  }
}
