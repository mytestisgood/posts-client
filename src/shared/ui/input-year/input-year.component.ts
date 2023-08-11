import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiHostedDropdownModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { tuiIconArrowDown } from '@taiga-ui/icons';
import { TuiInputYearModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-year',
  standalone: true,
  imports: [
    CommonModule, TuiInputYearModule, ReactiveFormsModule, TuiTextfieldControllerModule,
    TuiHostedDropdownModule,
  ],
  templateUrl: './input-year.component.html',
  styleUrls: ['./input-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputYearComponent {
  @Input() public isRequired: boolean = false;
  @Input() public placeholder: string = '';
  @Input() public customWidth: string = '';
  @Input() public control: FormControl<string | null> = new FormControl<string>('');
  protected readonly tuiIconArrowDown = tuiIconArrowDown;
}
