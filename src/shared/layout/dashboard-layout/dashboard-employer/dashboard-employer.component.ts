import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FeedbacksRecordsListItems } from '@shared/api/models';
import { FeedBackService } from '@shared/api/services';
import { DashboardHeaderIds, RecordListItems } from '@shared/entities';
import { DataSharingService, DropdownService } from '@shared/services';
import { DashboardEmployersTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  LoaderComponent,
} from '@shared/ui';
import { combineLatest, debounceTime, filter, map, Observable, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-employer',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    DashboardEmployersTableComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployerComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public isCustomDropdownActive: boolean = false;
  public recordList$!: Observable<RecordListItems[] | null>;
  public tableDropdownType!: string;

  constructor(
    private readonly feedBackService: FeedBackService,
    private readonly dataSharingService: DataSharingService,
    private readonly dropdownService: DropdownService,
  ) {
  }

  public ngOnInit(): void {
    this.recordList$ =
      this.dataSharingService.dashboardHeaderIds.pipe(
        filter(value => !!value.organizationId),
        switchMap((value: DashboardHeaderIds) => {
          return combineLatest([
            this.controlSearch.valueChanges.pipe(startWith('')),
            this.feedBackService.apiFeedbacksRecordsListGet({
              limit: '100',
              page: '1',
              employerId: value.employerId as string,
              departmentId: value.departmentId as string,
              organizationId: value.organizationId as string,
            }),
          ]).pipe(
            debounceTime(500),
            map(([query, response]) => {
              const recordListItem: RecordListItems[] | null = (response.items as FeedbacksRecordsListItems[])
                .map((item: FeedbacksRecordsListItems) => ({ ...item, isSelected: false })) ?? null;

              return recordListItem.filter(res =>
                (res.name as string).toLowerCase().indexOf(query?.toLowerCase() as string) > -1);
            }),
          );
        }),
      );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }

  public onButtonDropdownClick(type: string): void {
    this.tableDropdownType = type;
    this.activeElementClose(true);
  }
  public activeElementClose(active: boolean): void {
    if (active) {
      this.dropdownService?.setState(false);
    }
  }
}
