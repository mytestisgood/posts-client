import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';
import { InputFileComponent } from '../../../../shared/ui/input-file/input-file.component';
import { SelectComponent } from '../../../../shared/ui/select/select.component';

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-upload-document',
  standalone: true,
  imports: [CommonModule, DatePickerComponent, SelectComponent, InputFileComponent],
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentComponent {
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
