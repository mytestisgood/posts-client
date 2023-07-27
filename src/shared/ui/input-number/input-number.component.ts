import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputMonthModule,
    TuiTextfieldControllerModule,
    TuiInputNumberModule,
    MaskitoModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements OnInit{
  @Input() public isRequired: boolean = false;
  @Input() public centerVerify: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
  @Input() public maxLength: number = 10;
  @Input() public control: FormControl<string | null> = new FormControl<string>('');
  @Output() public inputFilled: Subject<boolean> = new Subject<boolean>();

  public maxLengthMask!: MaskitoOptions;

  public ngOnInit(): void {
    this.maxLengthMask = {
      mask: [
        ...Array(this.maxLength).fill(/\d/)
      ],
    };
  }

  public changeValue(): void {
    if (this.control.valid) {
      this.inputFilled.next(true);
    } else {
      this.inputFilled.next(false);
    }
  }
}
