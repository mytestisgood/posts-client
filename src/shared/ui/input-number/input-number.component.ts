import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputMonthModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { MaskitoOptions } from '@maskito/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-input-number',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, TuiInputModule, TuiInputMonthModule,
    TuiTextfieldControllerModule, TuiInputNumberModule, MaskitoModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements OnInit{
  @Input() public isRequired: boolean = false;
  @Input() public centerVerify: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public type: string = 'text';
  @Input() public customWidth: string = '';
  @Input() public maxLength: number = 10;
  @Output() public inputFilled: Subject<boolean> = new Subject<boolean>();

  public formInput!: FormGroup<{inputValue: FormControl<null>}>;
  public maxLengthMask!: MaskitoOptions;

  public ngOnInit(): void {
    this.maxLengthMask = {
      mask: [
        ...Array(this.maxLength).fill(/\d/)
      ],
    };
    this.formInput = new FormGroup({
      inputValue: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.maxLength)
      ]),
    });
  }

  public changeValue(): void {
    if (this.formInput.controls.inputValue.valid) {
      this.inputFilled.next(true);
    } else {
      this.inputFilled.next(false);
    }
  }
}
