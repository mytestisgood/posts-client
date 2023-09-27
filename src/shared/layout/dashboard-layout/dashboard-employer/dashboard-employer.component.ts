import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FeedbacksRecordsListItems } from '@shared/api/models';
import { FeedBackService } from '@shared/api/services';
import { RecordListItems, TOKEN } from '@shared/entities';
import { DashboardEmployersTableComponent } from '@shared/tables';
import { ButtonComponent, CustomDropdownComponent, InputSearchComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-employer',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    DashboardEmployersTableComponent,
  ],
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployerComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public isCustomDropdownActive: boolean = false;
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public recordList$!: Observable<RecordListItems[] | null>;

  constructor(
    private readonly feedBackService: FeedBackService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public ngOnInit(): void {
    this.recordList$ = combineLatest([
      this.controlSearch.valueChanges.pipe(startWith('')),
      this.feedBackService.apiFeedbacksRecordsListGet({
        token: this.token,
        limit: '1',
        page: '4',
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
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
