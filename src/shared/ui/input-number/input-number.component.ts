import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputMonthModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { MaskitoOptions } from '@maskito/core';

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

  readonly formInput = new FormGroup({
    inputValue: new FormControl(),
  });
  public maxLengthMask!: MaskitoOptions;

  public ngOnInit(): void {
    this.maxLengthMask = {
      mask: [
        ...Array(this.maxLength).fill(/\d/)
      ],
    };
  }
}
