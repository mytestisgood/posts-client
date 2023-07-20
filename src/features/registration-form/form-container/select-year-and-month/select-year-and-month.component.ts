import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent, DatePickerComponent, InputFieldComponent, SelectComponent } from '@shared/ui';

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-select-year-and-month',
  standalone: true,
  imports: [
    CommonModule, InputFieldComponent, SelectComponent, DatePickerComponent,
    ButtonComponent,
  ],
  templateUrl: './select-year-and-month.component.html',
  styleUrls: ['./select-year-and-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectYearAndMonthComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
  public personalInfoForm!: FormGroup;

  public monthsSelect: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  constructor(private _fb: FormBuilder) {}

  public ngOnInit(): void {
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

  public doChangeStep(direction: 'forward'): void {
    this.changeStep.emit(direction);
  }
}
