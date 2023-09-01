import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HomeService,
  InlineResponse2003,
  InlineResponse2004,
  InlineResponse2005,
} from '@shared/api';
import { REGISTRATION_TOKEN } from '@shared/entities';
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
import { InquiriesComponent } from './inquiries/inquiries.component';
import { LastPaymentComponent } from './last-payment/last-payment.component';

@Component({
  selector: 'smarti-dashboard-home',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, SelectComponent, InputYearComponent,
    LastPaymentComponent, DashboardHomeTableComponent, InquiriesComponent, FeedsComponent,
    BalanceForCompensationComponent, DashboardHomeSmallTableComponent,
    DashboardNotificationComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {
  public startDateCurrentMonth: string = getCurrentMonthStartDayDate('yyyy-mm-dd');
  public endDateCurrentMonth: string = getCurrentMonthLastDayDate('yyyy-mm-dd');
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public $employerReport: Observable<InlineResponse2003> = this.homeService.apiReportsEmployerReportPost(this.token, {
    employerId: '1',
    organizationId: '2',
    startDate: this.startDateCurrentMonth,
    endDate: this.endDateCurrentMonth,
    salaryMonth: true,
  });
  public chats$: Observable<Array<object>> = this.homeService.apiChatsGet(
    undefined,
    undefined,
    undefined,
    this.token,
  );
  public compensationReport$: Observable<InlineResponse2005> = this.homeService.apiReportsCompensationReportGet(
    undefined,
    undefined,
    formattedCurrentDateTo('yyyy-mm-dd'),
    undefined,
    undefined,
    undefined,
    undefined,
    this.token,
  );
  public feedbackEmployerReport$: Observable<InlineResponse2004> = this.homeService.apiReportsFeedbackEmployerReportGet(
   new Date().getFullYear().toString(),
    new Date().getMonth().toString(),
    '',
    '',
    '',
    this.token,
  );
  public year!: number;
  public month!: number;
  public searchingDate!: string | undefined;
  protected readonly getDayOfWeekAndCurrentDayDate = getDayOfWeekAndCurrentDayDate;

  constructor(
    private readonly homeService: HomeService,
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
    this.compensationReport$ = this.homeService.apiReportsCompensationReportGet(
      undefined,
      this.searchingDate,
      this.searchingDate,
      undefined,
      undefined,
      undefined,
      undefined,
      this.token,
    );
  }
}