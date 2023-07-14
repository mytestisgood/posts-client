import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';
import { SelectComponent } from '../../../../shared/ui/select/select.component';

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
export class SelectYearAndMonthComponent {
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
}
