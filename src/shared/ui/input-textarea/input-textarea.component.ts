import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiTextAreaModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-textarea',
  standalone: true,
  imports: [CommonModule, TuiTextfieldControllerModule, TuiTextAreaModule, ReactiveFormsModule],
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextareaComponent {
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
  @Input() public control: FormControl<string | null> = new FormControl<string>('');
  @Input() public customHeight: string = '';
}
