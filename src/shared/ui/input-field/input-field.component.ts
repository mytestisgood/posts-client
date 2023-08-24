import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiSizeM, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core/types';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
  @Input() public control: FormControl<string | null> = new FormControl<string>('');
  @Input() public customHeight: string = '';
  @Input() public inputTextFieldSize: TuiSizeL | TuiSizeS | TuiSizeM = 'm';
}
