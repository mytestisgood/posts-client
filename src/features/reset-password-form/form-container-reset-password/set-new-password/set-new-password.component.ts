import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SuccessDialogComponent} from '@shared/dialog';
import {AlertsService, DestroyService} from '@shared/services';
import {ButtonComponent, InputPasswordComponent} from '@shared/ui';
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {catchError, EMPTY, takeUntil, tap} from 'rxjs';
import {RegisterService, SignInService} from "@shared/api/services";
import {REGISTRATION_DATA, registrationUploadFileLink} from "@shared/entities";

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-set-new-password',
  standalone: true,
  imports: [
    CommonModule,
    InputPasswordComponent,
    ButtonComponent,
    SuccessDialogComponent,
  ],
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetNewPasswordComponent {
  @Input() public startingForm!: FormGroup;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
  public passwordControl: FormControl<string | null> = new FormControl('', [Validators.required]);


  public isDisabled: boolean = true;
  public firstPasswordValue!: string;
  public secondPasswordValue!: string;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly formBuilder: FormBuilder,
    private readonly registerService: RegisterService,
    private readonly alertsService: AlertsService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public openSuccessDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.registerService.apiRegisterPost({
      password: this.passwordControl.value as string,
    }).pipe(catchError((err) => {
        if (err.error.message === 'Password selected') {
          this.alertsService.showErrorNotificationIcon('סיסמה זו נבחרה בעבר');
        } else if (err.error.message === 'Password expired') {
          this.alertsService.showErrorNotificationIcon('תוקף הסיסמה פג');
        } else {
          this.alertsService.showErrorNotificationIcon('שגיאה');
        }
        return EMPTY;
      }),
      takeUntil(this.destroy$),
    ).subscribe(() => this.dialogs.open(content, {
      closeable: false,
    }).pipe(takeUntil(this.destroy$)).subscribe());

  }

  public onChangeFirstPasswordValue(value: string): void {
    this.firstPasswordValue = value;
    this.comparePasswords();
  }

  public onChangeSecondPasswordValue(value: string): void {
    this.secondPasswordValue = value;
    this.comparePasswords();
  }

  public comparePasswords(): void {
    this.isDisabled = this.firstPasswordValue !== this.secondPasswordValue;
  }
}
