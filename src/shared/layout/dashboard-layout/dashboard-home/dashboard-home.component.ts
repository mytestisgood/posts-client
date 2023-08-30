import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService, InlineResponse2004, InlineResponse2005 } from '@shared/api';
import { REGISTRATION_TOKEN } from '@shared/entities';
import { formattedCurrentDateTo, formattedMonthAndYearDateTo } from '@shared/helpers';
import { DashboardHomeSmallTableComponent, DashboardHomeTableComponent } from '@shared/tables';
import { ButtonComponent, InputYearComponent, SelectComponent } from '@shared/ui';
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
    DashboardNotificationComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public chats$: Observable<Array<object>> = this.homeService.apiChatsGet(
    undefined,
    undefined,
    undefined,
    this.token,
  );
  public employerReport: Observable<InlineResponse2004> = this.homeService.apiReportsFeedbackEmployerReportGet(
    undefined,
    undefined,
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
  public year!: number;
  public month!: number;
  public searchingDate!: string;

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
      return
    }

    this.onReportsCompensationGet();
  }

  public onReportsCompensationGet() {
    this.searchingDate = formattedMonthAndYearDateTo(this.month, this.year, 'yyyy-mm-dd');
    console.log(this.searchingDate);
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
