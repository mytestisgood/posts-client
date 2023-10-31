import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VerifyEmailFormComponent } from '@feature';
import {
  AllRegistrationSessionData,
  REGISTRATION_DATA,
  registrationVerifyCodeLink,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { SessionStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { takeUntil, withLatestFrom } from 'rxjs';

@Component({
  selector: 'smarti-verify-code',
  standalone: true,
  imports: [CommonModule, VerifyEmailFormComponent],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyCodeComponent implements AfterViewInit {

  @ViewChild('verifyCodeFormTemplate') public verifyCodeFormTemplate!: TuiDialogContext;
  public allRegistrationData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string) as AllRegistrationSessionData;
  public token: string = this.allRegistrationData.token as string;
  public departmentId: number = Number(this.allRegistrationData.departmentId);
  public currentEmail: string = this.allRegistrationData.email as string;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
  ) {
  }

  public ngAfterViewInit(): void {
    this.dialogs.open(this.verifyCodeFormTemplate, {
      closeable: false,
      dismissible: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
    this.router.events.pipe(
      withLatestFrom(this.dialogs),
      takeUntil(this.destroy$),
    ).subscribe(([event, dialogs]) => {
      if(event instanceof NavigationEnd && this.router.url !== registrationVerifyCodeLink && dialogs.length) {
        dialogs.forEach(dialog => {
          dialog.$implicit.complete();
        });
      }
    });
  }
}
