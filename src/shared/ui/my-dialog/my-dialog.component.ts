import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Subscription } from 'rxjs';

@Component({
  selector: 'smarti-my-dialog',
  standalone: true,
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDialogComponent implements OnDestroy {
  private readonly closeDialogSubscription: Subscription;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
    private readonly customDialogService: DialogService,

  ) {
    this.closeDialogSubscription = this.customDialogService.closeDialogEvent.subscribe(
      () => {
        this.closeDialog();
      },
    );
  }

  public closeDialog(): void {
    this.context.completeWith(false); // You can provide any value here
  }

  private ok(): void {
    this.context.completeWith(true);
  }

  private cancel(): void {
    this.context.completeWith(false);
  }

  ngOnDestroy(): void {
    this.closeDialogSubscription.unsubscribe();
  }
}
