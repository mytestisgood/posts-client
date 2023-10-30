import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProcessResponseItems } from '@shared/api/models';
import { ProcessesService } from '@shared/api/services';
import { DashboardHeaderIds, months, ProcessTableItems } from '@shared/entities';
import { getCurrentMonth, getCurrentYear } from '@shared/helpers';
import { DataSharingService } from '@shared/services';
import { DashboardProcessTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  InputYearComponent,
  LoaderComponent,
  SelectComponent,
} from '@shared/ui';
import { combineLatest, debounceTime, filter, map, Observable, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-processes',
  standalone: true,
  imports: [
    CommonModule, InputYearComponent, SelectComponent, ButtonComponent,
    InputSearchComponent, DashboardProcessTableComponent, CustomDropdownComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-processes.component.html',
  styleUrls: ['./dashboard-processes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessesComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public departmentId!: string;
  public isCustomDropdownActive: boolean = false;
  public dashboardProcessItems$!: Observable<ProcessTableItems[] | null>;
  protected readonly months: string[] = months;

  constructor(
    private readonly processesService: ProcessesService,
    private readonly dataSharingService: DataSharingService,
  ) {
  }

  public ngOnInit(): void {
    this.dashboardProcessItems$ =
      this.dataSharingService.dashboardHeaderIds.pipe(
        filter(value => !!value.organizationId),
        switchMap((value: DashboardHeaderIds) => {
          this.departmentId = value.departmentId as string;
          return combineLatest([
            this.controlSearch.valueChanges.pipe(startWith('')),
            this.processesService.apiProcessesGet({
              limit: '100',
              page: '1',
              location: false,
              month: getCurrentMonth().toString(),
              year: getCurrentYear().toString(),
              departmentId: value.departmentId as string,
              employerId: value.employerId as string,
              organizationId: value.organizationId as string,
            }),
          ]).pipe(
            debounceTime(500),
            map(([query, response]) => {
              const processTableItems: ProcessTableItems[] | null = (response.items as ProcessResponseItems[])
                .map(item => ({ ...item, isSelected: new FormControl(false) })) ?? null;

              return processTableItems?.filter(res =>
                (res.name as string).toLowerCase().indexOf(query?.toLowerCase() as string) > -1);
            }),
          );
        }),
      );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
