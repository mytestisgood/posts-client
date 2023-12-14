import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
  TUI_INPUT_PASSWORD_OPTIONS,
  TuiInputModule,
  TuiInputPasswordModule
} from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-input-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
  ],
  providers: [
    {
      provide: TUI_INPUT_PASSWORD_OPTIONS,
      useValue: {
        ...TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
        icons: {
          hide: 'tuiIconEyeOff',
          show: 'tuiIconEye',
        },
      },
    },
  ],
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent {
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
  @Input() public control: FormControl<string | null> = new FormControl<string>('', [
    Validators.minLength(6),
  ]);
  @Output() public outputValue: Subject<string> = new Subject<string>();

  public onValidatePasswordValue(): void {
    console.log(222, this.control.valid)
    if (this.control.valid) {
      this.outputValue.next(this.control.value as string);
    } else {
      this.outputValue.next('invalid' + Math.random());
    }
  }
}
