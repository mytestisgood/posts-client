import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AlertsService, DestroyService} from '@shared/services';
import {ButtonComponent, InputFieldComponent} from '@shared/ui';
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {catchError, map, of, takeUntil, withLatestFrom} from 'rxjs';
import {RegisterService} from "@shared/api/services";
import {isMobile} from '@shared/helpers';

@Component({
  selector: 'smarti-aside-process-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ButtonComponent],
  templateUrl: './aside-process-dialog.component.html',
  styleUrls: ['./aside-process-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideProcessDialogComponent {
  public isMobile = isMobile
  public customWidth = this.isMobile? '320px': '536px'
  public customButtonWidth = this.isMobile? '220px': '180px'
  @Input() public observer!: { complete: () => void };
  @Input() public step!: string;
  public email: FormControl<string | null> = new FormControl('');


  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly alertsService: AlertsService,
    private readonly registerService: RegisterService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(content: PolymorpheusContent<TuiDialogContext>): void {
    this.registerService.sendEmailUserContinueProcess({step: this.step, email: this.email.value}).pipe(
      map((res) => {
        if (res.message === 'ok') {
          this.observer.complete();
          this.dialogs.open(content, {
            closeable: false,
            size: 'm',
          });
        }
      }),
      catchError((err) => {
        this.alertsService.showErrorNotificationIcon('שגיאה');
        return of(err);
      }),
      takeUntil(this.destroy$),
    ).subscribe()
    ;
  }

  public closeSecondDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
