import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardHeaderGroupControls, dashboardHeaderGroupMapper } from '@shared/entities';
import { TuiGroupModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiMultiSelectModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-custom-group-select',
  standalone: true,
  imports: [
    CommonModule, TuiMultiSelectModule, TuiDataListWrapperModule,
    TuiTextfieldControllerModule, ReactiveFormsModule, TuiGroupModule,
  ],
  templateUrl: './custom-group-select.component.html',
  styleUrls: ['./custom-group-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomGroupSelectComponent {
  @Input() public groupSelectedForm: FormGroup<DashboardHeaderGroupControls> = dashboardHeaderGroupMapper();
}
