import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@shared/api/services';
import { emailValidatorPattern, israelMobilePhoneValidatorPattern, loginAfterRegistrationLink } from '@shared/entities';
import { AlertsService, DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent, InputNumberComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import {
  BehaviorSubject,
  takeUntil,
  tap,
  withLatestFrom,
  concatMap,
  map,
  of,
  switchMap,
  catchError,
  EMPTY,
  debounceTime,
} from 'rxjs';
import { SessionStorageService } from '@shared/web-api';
import { Router } from '@angular/router';
import {isMobile} from '@shared/helpers';


interface ForwardRequestForm {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  userName: FormControl<string | null>;
}

@Component({
  selector: 'smarti-forward-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    ReactiveFormsModule,
    InputNumberComponent,
  ],
  templateUrl: './forward-request-dialog.component.html',
  styleUrls: ['./forward-request-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForwardRequestDialogComponent {
  @Input() public haveCloseIcon: boolean = false;
  @Input() public observer!: { complete: () => void };
  @Input() public identifier!: string;
  @Input() public departmentId!: number;
  @Output() public requestSend: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isMobile = isMobile
  public customWidth = this.isMobile? '320px': '536px'

  public forwardRequestForm: FormGroup<ForwardRequestForm> = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(israelMobilePhoneValidatorPattern)]),
    userName: new FormControl(''),
  });

  constructor(
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly destroy$: DestroyService,
    private readonly userService: UserService,
    private readonly alertsService: AlertsService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(content: PolymorpheusContent<TuiDialogContext>): void {
    this.userService.apiEmployersCreateUserOutPost({
      email: this.forwardRequestForm.controls.email.value as string,
      phone: this.forwardRequestForm.controls.phone.value as string,
      user_name: this.forwardRequestForm.controls.userName.value as string,
      identifier: this.identifier,
      departmentId: this.departmentId,
    }).pipe(
      tap((res) => {
        if (res.code === 200) {
          this.observer.complete();
          this.sessionStorageService.clear();
          this.alertsService.showSuccessNotificationIcon(' התהליך נשלח אל איש הקשר שביקשת נודיע לך כאשר התהליך יושלם');
          this.router.navigate([loginAfterRegistrationLink]);
        }
      }),
      catchError((err) => {
        const MESSAGE_ERROR = 'user exist';
        if ((err.error !== undefined && err.error.message === MESSAGE_ERROR) || err.message === MESSAGE_ERROR) {
          this.alertsService.showErrorNotificationIcon('משתמש קיים');
        }
        else {
          this.alertsService.showErrorNotificationIcon('שגיאה');
        }
        return EMPTY;
      }),
      debounceTime(500),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      // this.dialogs.open(content, {
      //   closeable: false,
      //   size: 'm',
      // });
    });
  }

  public closeSecondDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
