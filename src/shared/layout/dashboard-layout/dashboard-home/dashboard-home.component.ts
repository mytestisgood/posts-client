import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CompensationReportGetResponse,
  EmployerReportResponse,
  FeedbackEmployerReportGetResponse,
  UserResponse,
} from '@shared/api/models';
import { ChatService, HomeService } from '@shared/api/services';
import { CURRENT_USER, DashboardHeaderIds } from '@shared/entities';
import {
  formattedMonthAndYearDateTo,
  getCurrentMonthLastDayDate,
  getCurrentMonthStartDayDate,
  getCurrentTimeAndReturnStringMessage,
  getDayOfWeekAndCurrentDayDate,
} from '@shared/helpers';
import { DataSharingService } from '@shared/services';
import { DashboardHomeSmallTableComponent, DashboardHomeTableComponent } from '@shared/tables';
import { ButtonComponent, InputYearComponent, LoaderComponent, SelectComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';
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
export class DashboardHomeComponent implements OnInit {
  public startDateCurrentMonth: string = getCurrentMonthStartDayDate('yyyy-mm-dd');
  public endDateCurrentMonth: string = getCurrentMonthLastDayDate('yyyy-mm-dd');
  public employerReport$!: Observable<EmployerReportResponse>;
  public chats$!: Observable<Array<object>>;
  public compensationReport$!: Observable<CompensationReportGetResponse>;
  public feedbackEmployerReport$!: Observable<FeedbackEmployerReportGetResponse>;
  public notifications$: Observable<[]> = of([]).pipe(
    delay(500),
    map(() => ([])),
  );
  public year!: number;
  public month!: number;
  public searchingDate!: string | undefined;
  public userName!: string;
  public dayMessage!: string;
  protected readonly getDayOfWeekAndCurrentDayDate = getDayOfWeekAndCurrentDayDate;

  constructor(
    private readonly homeService: HomeService,
    private readonly chatService: ChatService,
    private readonly dataSharingService: DataSharingService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.getDayInfo();
    this.getUserName();
    this.employerReportData();
    this.chatsData();
    this.compensationReportData();
    this.feedbackEmployerReportData();
  }

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
      startDate: this.searchingDate,
      endDate: this.searchingDate,
    });
  }

  private chatsData(): void {
    this.chats$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter((value: DashboardHeaderIds) => !!value.organizationId),
      switchMap((value: DashboardHeaderIds) => {
        return this.chatService.apiChatsGet({
          status: 'all',
          employerId: value.employerId as string,
          organizationId: value.organizationId as string,
        });
      }),
    );
  }

  private employerReportData(): void {
    this.employerReport$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter((value: DashboardHeaderIds) => !!value.organizationId),
      switchMap((value: DashboardHeaderIds) => {
        return this.homeService.apiReportsEmployerReportPost({
          startDate: this.startDateCurrentMonth,
          endDate: this.endDateCurrentMonth,
          salaryMonth: true,
          organizationId: value.organizationId as string,
          employerId: value.employerId as string,
        });
      }),
    );
  }

  private compensationReportData(): void {
    this.compensationReport$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter((value: DashboardHeaderIds) => !!value.organizationId),
      switchMap((value: DashboardHeaderIds) => {
        return this.homeService.apiReportsCompensationReportGet({
          startDate: this.startDateCurrentMonth,
          endDate: this.endDateCurrentMonth,
          organizationId: value.organizationId as string,
          employerId: value.employerId as string,
          departmentId: value.departmentId as string,
          type: 'employee',
          salaryMonth: true,
        });
      }),
    );
  }

  private feedbackEmployerReportData(): void {
    this.feedbackEmployerReport$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter((value: DashboardHeaderIds) => !!value.organizationId),
      switchMap((value: DashboardHeaderIds) => {
        return this.homeService.apiReportsFeedbackEmployerReportGet({
          year: new Date().getFullYear().toString(),
          month: new Date().getMonth().toString(),
          employerId: value.employerId as string,
          organizationId: value.departmentId as string,
        });
      }),
    );
  }

  private getUserName(): void {
    const currentUser: UserResponse = JSON
      .parse(this.localStorageService.getItem(CURRENT_USER) as string) as UserResponse;

    this.userName = currentUser.name as string;
  }

  private getDayInfo(): void {
    this.dayMessage = getCurrentTimeAndReturnStringMessage();
  }
}
