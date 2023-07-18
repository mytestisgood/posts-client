import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-password',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, TuiInputPasswordModule, TuiTextfieldControllerModule,
    TuiInputModule,
  ],
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent {
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';

  public readonly formInputPassword = new FormGroup({
    inputValue: new FormControl(),
  });
}
