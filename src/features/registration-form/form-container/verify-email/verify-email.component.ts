import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyService } from '@shared/services';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import {
  SuccessDialogComponent,
} from '@shared/dialog';
import { ButtonComponent, InputNumberComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-verify-email',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputNumberComponent,
    SuccessDialogComponent,
  ],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

  public personalInfoForm!: FormGroup;
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly fb: FormBuilder,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    if (this.startingForm) {
      this.personalInfoForm = this.startingForm;
    } else {
      this.personalInfoForm = this.fb.group({
        firstName: '',
        lastName: '',
      });
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }

  public openSuccessDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
