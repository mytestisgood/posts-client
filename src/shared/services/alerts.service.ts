import { Inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { takeUntil } from 'rxjs';
import { DestroyService } from './destroy.service';

@Injectable({ providedIn: 'root' })
export class AlertsService {

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly destroy$: DestroyService,
  ) {
  }
  public showSuccessNotificationIcon(message: string): void {
    this.alerts.open(message, {
      autoClose: 5000,
      hasCloseButton: false,
      status: 'success',
      icon: '/assets/svg/success-notification-icon-32.svg',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public showErrorNotificationIcon(message: string): void {
    this.alerts.open(message, {
      autoClose: 5000,
      hasCloseButton: false,
      status: 'error',
      icon: '/assets/svg/error-notification-icon-32.svg',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
