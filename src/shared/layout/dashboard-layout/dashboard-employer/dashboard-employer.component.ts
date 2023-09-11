import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeedBackService, InlineResponse20039, InlineResponse20039Items } from '@shared/api';
import { RecordListItems, REGISTRATION_TOKEN } from '@shared/entities';
import { DashboardEmployersTableComponent } from '@shared/tables';
import { ButtonComponent, CustomDropdownComponent, InputSearchComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { map, Observable } from 'rxjs';

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
export class DashboardEmployerComponent {
  public isCustomDropdownActive: boolean = false;
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public recordList$: Observable<RecordListItems[] | null> = this.feedBackService.apiFeedbacksRecordsListGet(
    '',
    '',
    '',
    '',
    '1',
    '4',
    this.token,
  ).pipe(
    map((response: InlineResponse20039) => {
      if (response?.items?.length) {
        return response.items.map((item: InlineResponse20039Items) => ({
          ...item,
          isSelected: false,
        }));
      }
      return null;
    }),
  );

  constructor(
    private readonly feedBackService: FeedBackService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
