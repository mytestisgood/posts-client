import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';

type Direction = 'forward' | 'back';

interface PersonalInfoControls {
  companyName: string;
  companyId: string;
  yourName: string;
  email: string;
  mobilePhone: string;
  acceptPrivacy: boolean;
}

@Component({
  selector: 'smarti-personal-info',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
  public personalInfoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    if (this.startingForm) {
      this.personalInfoForm = this.startingForm;
    } else {
      this.personalInfoForm = this.formBuilder.group({
        companyName: ['', [Validators.required, Validators.minLength(3)]],
        companyId: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.minLength(3)]],
        yourName: '',
        mobilePhone: ['', [Validators.required, Validators.minLength(3)]],
        acceptPrivacy: [false, [Validators.required, Validators.minLength(3)]],
      })
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }

  public doChangeStep(direction: 'forward') {
    this.changeStep.emit(direction);
  }
}
