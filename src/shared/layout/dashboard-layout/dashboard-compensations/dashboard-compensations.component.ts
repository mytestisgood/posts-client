import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompensationsService } from '@shared/api/services';
import { CompensationsListItems, DashboardHeaderIds } from '@shared/entities';
import { DataSharingService } from '@shared/services';
import { DashboardCompensationsTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputDateComponent,
  InputSearchComponent,
  LoaderComponent,
  SelectComponent,
} from '@shared/ui';
import { combineLatest, debounceTime, filter, map, Observable, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-compensations',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    SelectComponent, InputDateComponent, DashboardCompensationsTableComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-compensations.component.html',
  styleUrls: ['./dashboard-compensations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCompensationsComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public isCustomDropdownActive: boolean = false;
  public compensations$!: Observable<CompensationsListItems[] | null>;

  constructor(
    private readonly compensationsService: CompensationsService,
    private readonly dataSharingService: DataSharingService,
  ) {
  }

  public ngOnInit(): void {
    this.compensations$ =
      this.dataSharingService.dashboardHeaderIds.pipe(
        filter(value => !!value.organizationId),
        switchMap((value: DashboardHeaderIds) => {
          return combineLatest([
            this.controlSearch.valueChanges.pipe(startWith('')),
            this.compensationsService.apiCompensationsGet({
              eventCode: '9301',
              page: '1',
              limit: '100',
              employerId: value.employerId as string,
              organizationId: value.organizationId as string,
              departmentId: value.departmentId as string,
            }),
          ]).pipe(
            debounceTime(500),
            map(([query, response]) => {
              const compensationsListItems: CompensationsListItems[] | null =
                (response.items as CompensationsListItems[]).map((item: CompensationsListItems) =>
                  ({ ...item, isSelected: false }));

              return compensationsListItems.filter((res: CompensationsListItems) =>
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
