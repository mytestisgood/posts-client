import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBannerLayoutComponent} from "./main-banner-layout/main-banner-layout.component";
import {AboutLayoutComponent} from "./about-layout/about-layout.component";
import {StartDayWithSmartiLayoutComponent} from "./start-day-with-smarti-layout/start-day-with-smarti-layout.component";
import {ConnectNowLayoutComponent} from "./connect-now-layout/connect-now-layout.component";
import {RunBusinessLayoutComponent} from "./run-business-layout/run-business-layout.component";
import {EmployeeManagementLayoutComponent} from "./employee-management-layout/employee-management-layout.component";
import {BlogLayoutComponent} from "./blog-layout/blog-layout.component";
import {QuestionsBannerLayoutComponent} from "./questions-banner-layout/questions-banner-layout.component";
import {CompanySliderLayoutComponent} from "./company-slider-layout/company-slider-layout.component";

@Component({
  selector: 'smarti-landing-layout',
  standalone: true,
  imports: [
    CommonModule,
    MainBannerLayoutComponent,
    AboutLayoutComponent,
    StartDayWithSmartiLayoutComponent,
    ConnectNowLayoutComponent,
    CompanySliderLayoutComponent,
    RunBusinessLayoutComponent,
    EmployeeManagementLayoutComponent,
    BlogLayoutComponent,
    QuestionsBannerLayoutComponent
  ],
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingLayoutComponent {

}
