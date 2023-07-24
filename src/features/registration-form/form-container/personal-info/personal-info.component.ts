import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl, FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputCheckboxComponent, InputFieldComponent } from '@shared/ui';
import { Observable, takeUntil, tap } from 'rxjs';

type Direction = 'forward' | 'back';

interface PersonalInfoControls {
  companyName: FormControl<string | null>;
  companyId: FormControl<string | null>;
  yourName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  acceptPrivacy: FormControl<boolean | null>;
}

@Component({
  selector: 'smarti-personal-info',
  standalone: true,
  imports: [
    CommonModule, InputFieldComponent, ReactiveFormsModule, InputCheckboxComponent,
    ButtonComponent,
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

  public isDisabled: boolean = true;
  public personalInfoForm: FormGroup<PersonalInfoControls> = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    companyId: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    yourName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
    acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
  });
  public personalInfoFormChange$: Observable<FormControlStatus> = this.personalInfoForm.statusChanges.pipe(
    tap(isValid => this.isDisabled = !(isValid === 'VALID')),
    takeUntil(this.destroy$),
  );

  constructor(private readonly destroy$: DestroyService) {
  }

  public ngOnInit(): void {
    this.subformInitialized.emit(this.personalInfoForm);
    this.personalInfoFormChange$.subscribe();
  }

  public doChangeStep(direction: 'forward'): void {
    this.changeStep.emit(direction);
  }
}
