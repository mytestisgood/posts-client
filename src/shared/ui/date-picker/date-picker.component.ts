import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputDateModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-date-picker',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TuiInputDateModule, TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  @Input() public customWidth!: string
  @Input() public placeholder!: string
  @Input() public noLabel = false;
  @Input() public invalid: boolean | null = null;

  public selectedDate: any;
  public datePickerConfig: any;
  readonly dateForm = new FormGroup({
    dateValue: new FormControl(),
  });


}
