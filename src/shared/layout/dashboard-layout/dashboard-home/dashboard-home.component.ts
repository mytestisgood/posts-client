import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CompensationReportGetResponse,
  EmployerReportResponse,
  FeedbackEmployerReportGetResponse,
} from '@shared/api/models';
import { ChatService, HomeService } from '@shared/api/services';
import { TOKEN } from '@shared/entities';
import {
  formattedCurrentDateTo,
  formattedMonthAndYearDateTo,
  getCurrentMonthLastDayDate,
  getCurrentMonthStartDayDate,
  getDayOfWeekAndCurrentDayDate,
} from '@shared/helpers';
import { DashboardHomeSmallTableComponent, DashboardHomeTableComponent } from '@shared/tables';
import { ButtonComponent, InputYearComponent, LoaderComponent, SelectComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { Observable } from 'rxjs';
import {
  DashboardNotificationComponent,
} from '../dashboard-notification/dashboard-notification.component';
import {
  BalanceForCompensationComponent,
} from './balance-for-compensation/balance-for-compensation.component';
import { FeedsComponent } from './feeds/feeds.component';
import {
  HomeSwitchersFiltersComponent,
} from './home-switchers-filters/home-switchers-filters.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { LastPaymentComponent } from './last-payment/last-payment.component';

@Component({
  selector: 'smarti-dashboard-home',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, SelectComponent, InputYearComponent,
    LastPaymentComponent, DashboardHomeTableComponent, InquiriesComponent, FeedsComponent,
    BalanceForCompensationComponent, DashboardHomeSmallTableComponent,
    DashboardNotificationComponent, LoaderComponent, HomeSwitchersFiltersComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {
  public startDateCurrentMonth: string = getCurrentMonthStartDayDate('yyyy-mm-dd');
  public endDateCurrentMonth: string = getCurrentMonthLastDayDate('yyyy-mm-dd');
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public $employerReport: Observable<EmployerReportResponse> = this.homeService.apiReportsEmployerReportPost({
    token: this.token,
    reportsEmployerReportBody: {
      employerId: '1',
      organizationId: '2',
      startDate: this.startDateCurrentMonth,
      endDate: this.endDateCurrentMonth,
      salaryMonth: true,
    },
  });
  public chats$: Observable<Array<object>> = this.chatService.apiChatsGet({ token: this.token });
  public compensationReport$: Observable<CompensationReportGetResponse> =
    this.homeService.apiReportsCompensationReportGet({
    token: this.token,
    startDate: formattedCurrentDateTo('yyyy-mm-dd'),
  });
  public feedbackEmployerReport$: Observable<FeedbackEmployerReportGetResponse> =
    this.homeService.apiReportsFeedbackEmployerReportGet({
      year: new Date().getFullYear().toString(),
      month: new Date().getMonth().toString(),
      token: this.token,
    });
  public year!: number;
  public month!: number;
  public searchingDate!: string | undefined;
  protected readonly getDayOfWeekAndCurrentDayDate = getDayOfWeekAndCurrentDayDate;

  constructor(
    private readonly homeService: HomeService,
    private readonly chatService: ChatService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public onChangeMonth(month: number): void {
    this.month = month;
    if (!this.year) {
      return;
    }

    this.onReportsCompensationGet();
  }

  public onChangeYear(year: number): void {
    this.year = year;
    if (!this.month) {
      return;
    }

    this.onReportsCompensationGet();
  }

  public onReportsCompensationGet(): void {
    this.searchingDate = formattedMonthAndYearDateTo(this.month, this.year, 'yyyy-mm-dd');
    this.compensationReport$ = this.homeService.apiReportsCompensationReportGet({
      token: this.token,
      startDate: this.searchingDate,
      endDate: this.searchingDate,
    });
  }
}
