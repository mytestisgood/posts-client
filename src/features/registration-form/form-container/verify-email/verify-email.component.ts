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
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import {
  RegistrationSuccessDialogComponent
} from '../../../../shared/dialog/registration-success-dialog/registration-success-dialog.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputNumberComponent } from '../../../../shared/ui/input-number/input-number.component';

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-verify-email',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputNumberComponent, RegistrationSuccessDialogComponent],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

  public personalInfoForm!: FormGroup;
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    if (this.startingForm) {
      this.personalInfoForm = this.startingForm;
    } else {
      this.personalInfoForm = this._fb.group({
        firstName: '',
        lastName: '',
        // ... continue with the other fields
      })
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }
  doChangeStep(direction: 'forward') {
    this.changeStep.emit(direction);
  }

  public openSuccessDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }
}
