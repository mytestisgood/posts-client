import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  GetOrganizationsResponse,
  IdAndNameResponse,
  OrganizationsGetOrganizationsEmployer,
} from '@shared/api/models';
import { DashboardHeaderGroupControls, dashboardHeaderGroupMapper } from '@shared/entities';
import { DataSharingService } from '@shared/services';
import {
  TuiDropdownModule,
  TuiGroupModule,
  TuiPrimitiveTextfieldModule,
  TuiSizeM,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core/types';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'smarti-custom-group-select-dashboard-header',
  standalone: true,
  imports: [
    CommonModule, TuiDataListWrapperModule,
    TuiTextfieldControllerModule, ReactiveFormsModule, TuiGroupModule, TuiPrimitiveTextfieldModule,
    TuiSelectModule, TuiDropdownModule, SelectComponent,
  ],
  templateUrl: './custom-group-select-dashboard-header.component.html',
  styleUrls: ['./custom-group-select-dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomGroupSelectDashboardHeaderComponent implements OnInit {
  @Input() public groupSelectedForm: FormGroup<DashboardHeaderGroupControls> = dashboardHeaderGroupMapper();
  @Input() public textFieldSize: TuiSizeM | TuiSizeS | TuiSizeL = 'm';
  @Input() public control: FormControl<string | null> = new FormControl();
  @Input() public customWidth!: string;
  @Input() public data!: GetOrganizationsResponse[] | null;

  public organizations: string[] = [];
  public employers: string[] = [];
  public departments: string[] = [];

  constructor(private readonly dataSharingService: DataSharingService) {
  }

  public ngOnInit(): void {
    if (this.data?.length && this.data[0].employer?.length && this.data[0].employer[0].department?.length) {
      const firstEmployer: OrganizationsGetOrganizationsEmployer = this.data[0].employer[0];
      const firstDepartment: IdAndNameResponse = this.data[0].employer[0].department[0];

      this.groupSelectedForm.controls.organization.setValue(this.data[0].name as string);
      this.groupSelectedForm.controls.employer.setValue(firstEmployer.name as string);
      this.groupSelectedForm.controls.department.setValue(firstDepartment.name as string);

      this.dataSharingService.dashboardHeaderIds.next({
        organizationId: this.data[0].id as string,
        employerId: (firstEmployer.id as number).toString(),
        departmentId: (firstDepartment.id as number).toString(),
      });
    }
    this.setupOptionsValue();
  }

  private setupOptionsValue(): void {
    if (this.data !== null) {
      this.data.forEach(organizations => {
        this.organizations?.push(organizations.name as string);
      });
      this.data[0].employer?.forEach(employer => {
        this.employers?.push(employer.name as string);
        employer.department?.forEach(department => {
          this.departments.push(department.name as string);
        });
      });
    }
  }
}
