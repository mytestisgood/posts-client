import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardHeaderGroupControls, dashboardHeaderGroupMapper } from '@shared/entities';
import {
  TuiDropdownModule,
  TuiGroupModule,
  TuiPrimitiveTextfieldModule,
  TuiSizeM,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core/types';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-custom-group-select',
  standalone: true,
  imports: [
    CommonModule, TuiDataListWrapperModule,
    TuiTextfieldControllerModule, ReactiveFormsModule, TuiGroupModule, TuiPrimitiveTextfieldModule,
    TuiSelectModule, TuiDropdownModule,
  ],
  templateUrl: './custom-group-select.component.html',
  styleUrls: ['./custom-group-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomGroupSelectComponent {
  @Input() public groupSelectedForm: FormGroup<DashboardHeaderGroupControls> = dashboardHeaderGroupMapper();
  @Input() public textFieldSize: TuiSizeM | TuiSizeS | TuiSizeL = 'm';
  @Input() public control: FormControl<string | null> = new FormControl();
  @Input() public customWidth!: string;
}
