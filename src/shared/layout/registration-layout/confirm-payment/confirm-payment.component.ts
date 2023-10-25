import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfirmPaymentFormComponent } from '@feature';
import { registrationConfirmPaymentLink } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { takeUntil, withLatestFrom } from 'rxjs';

@Component({
  selector: 'smarti-confirm-payment',
  standalone: true,
  imports: [CommonModule, ConfirmPaymentFormComponent],
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPaymentComponent implements AfterViewInit {
  @ViewChild('confirmPaymentDialog') public confirmPaymentDialog!: TuiDialogContext;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly router: Router,
  ) {
  }

  public ngAfterViewInit(): void {
    this.dialogs.open(this.confirmPaymentDialog, {
      closeable: false,
      dismissible: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
    this.router.events.pipe(
      withLatestFrom(this.dialogs),
      takeUntil(this.destroy$),
    ).subscribe(([event, dialogs]) => {
      if(event instanceof NavigationEnd && this.router.url !== registrationConfirmPaymentLink && dialogs.length) {
        dialogs.forEach(dialog => {
          dialog.$implicit.complete();
        });
      }
    });
  }
}
