import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

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
  @Output() public outputValue: Subject<string> = new Subject<string>();

  public readonly formInputPassword = new FormGroup({
    inputValue: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public onValidatePasswordValue() {
    if (this.formInputPassword.controls.inputValue.valid) {
      this.outputValue.next(this.formInputPassword.controls.inputValue.value as string);
    } else {
      this.outputValue.next('invalid' + Math.random())
    }
  }
}
