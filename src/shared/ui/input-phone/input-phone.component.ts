import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputPhoneModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-phone',
  standalone: true,
  imports: [CommonModule, TuiInputPhoneModule, ReactiveFormsModule],
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPhoneComponent {
  @Input() public control: FormControl<string | null> = new FormControl<string>('', [
    Validators.minLength(10),
  ]);
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
}
