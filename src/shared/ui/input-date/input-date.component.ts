import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputDateModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-date',
  standalone: true,
  imports: [CommonModule, TuiInputDateModule, ReactiveFormsModule, TuiTextfieldControllerModule],
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent {
  @Input() public control: FormControl = new FormControl();
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
}
