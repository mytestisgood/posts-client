import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'smarti-select-year-and-month',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-year-and-month.component.html',
  styleUrls: ['./select-year-and-month.component.scss']
})
export class SelectYearAndMonthComponent {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<boolean | string> = new EventEmitter<boolean | string>();
  public personalInfoForm!: FormGroup;
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
