import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdAndNameResponse } from '@shared/api/models';
import { TuiHostedDropdownModule, TuiSizeM, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core/types';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  TuiSelectModule,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';

@Component({
  selector: 'smarti-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiHostedDropdownModule,
    TuiStringifyContentPipeModule,
    TuiFilterByInputPipeModule,
    TuiComboBoxModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() public customWidth!: string;
  @Input() public options!: any[];
  @Input() public comboBoxOptions!: IdAndNameResponse[];
  @Input() public selectMode!: 'big';
  @Input() public placeholder!: string;
  @Input() public control: FormControl<string | IdAndNameResponse | null> = new FormControl();
  @Input() public textFieldSize: TuiSizeM | TuiSizeS | TuiSizeL = 'm';
  @Input() public isComboBoxMode: boolean = false;
  @Input() public isNoBorderMode: boolean = false;

  public readonly stringify = (item: IdAndNameResponse | null): string => `${item?.name}`;
}
