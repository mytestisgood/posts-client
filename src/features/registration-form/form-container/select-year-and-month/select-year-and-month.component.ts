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
    CommonModule,
    InputFieldComponent,
    SelectComponent,
    DatePickerComponent,
    ButtonComponent,
  ],
  templateUrl: './select-year-and-month.component.html',
  styleUrls: ['./select-year-and-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectYearAndMonthComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
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
  ];

  constructor(private readonly fb: FormBuilder) {}

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

  public doChangeStep(direction: 'forward'): void {
    this.changeStep.emit(direction);
  }
}
