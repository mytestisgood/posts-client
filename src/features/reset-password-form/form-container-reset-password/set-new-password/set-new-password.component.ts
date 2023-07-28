import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuccessDialogComponent } from '@shared/dialog';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputPasswordComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

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

  public isDisabled: boolean = true;
  public firstPasswordValue!: string;
  public secondPasswordValue!: string;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly formBuilder: FormBuilder,
    private readonly destroy$: DestroyService,
  ) {
  }

  public openSuccessDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
    }).pipe(takeUntil(this.destroy$)).subscribe();
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
