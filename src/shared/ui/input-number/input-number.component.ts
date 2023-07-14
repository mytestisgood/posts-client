import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputMonthModule, TuiInputNumberModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-number',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, TuiInputModule, TuiInputMonthModule,
    TuiTextfieldControllerModule, TuiInputNumberModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent {
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public type: string = 'text';
  @Input() public centerVerify: boolean = false;
  @Input() public customWidth: string = '';
  @Input() public maximumValue!: number;
  readonly formInput = new FormGroup({
    inputValue: new FormControl(''),
  });
}
