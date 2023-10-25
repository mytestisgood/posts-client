import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BankDetails } from '@shared/api/models';
import { registrationConfirmPaymentLink } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-bank-details-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './bank-details-dialog.component.html',
  styleUrls: ['./bank-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankDetailsDialogComponent implements AfterViewInit {
  @Input() public observer!: { complete: () => void };
  @Input() public bankDetailsSmarti!: BankDetails | undefined;
  private isNeedToNavigateAfterClose: boolean = false;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly router: Router,
  ) {
  }

  public ngAfterViewInit(): void {
    this.dialogs.subscribe(dialog => {
      if (this.isNeedToNavigateAfterClose && !dialog.length) {
        this.isNeedToNavigateAfterClose = false;
        this.router.navigate([registrationConfirmPaymentLink]);
      }
    });
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(content: PolymorpheusContent<TuiDialogContext>): void {
    this.observer.complete();
    this.isNeedToNavigateAfterClose = true;
    this.dialogs.open(content, {
      closeable: false,
      size: 'm',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public closeSecondDialog(observer: { complete: () => void }): void {
    observer.complete();
  }

  public isEmptyString(str: string | undefined): boolean {
    return !str?.length;
  }
}
