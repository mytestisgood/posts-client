import {
  Component, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { TuiHostedDropdownModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-select',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule, TuiSelectModule,
    TuiTextfieldControllerModule, TuiDataListWrapperModule, TuiHostedDropdownModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() public customWidth!: string;
  @Input() public options!: string[];
  @Input() public selectMode!: string;
  @Input() public placeholder!: string;

  public selectedOption!: number;
  selectValue = new FormControl();
}
