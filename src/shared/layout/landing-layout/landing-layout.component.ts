import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { NavigationEvent } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { filter, takeUntil } from 'rxjs';
import { AboutLayoutComponent } from './about-layout/about-layout.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import {
  CompanySliderLayoutComponent,
} from './company-slider-layout/company-slider-layout.component';
import { ConnectNowLayoutComponent } from './connect-now-layout/connect-now-layout.component';
import {
  EmployeeManagementLayoutComponent,
} from './employee-management-layout/employee-management-layout.component';
import { MainBannerLayoutComponent } from './main-banner-layout/main-banner-layout.component';
import {
  QuestionsBannerLayoutComponent,
} from './questions-banner-layout/questions-banner-layout.component';
import { RunBusinessLayoutComponent } from './run-business-layout/run-business-layout.component';
import {
  StartDayWithSmartiLayoutComponent,
} from './start-day-with-smarti-layout/start-day-with-smarti-layout.component';

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
    QuestionsBannerLayoutComponent,
  ],
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingLayoutComponent implements AfterViewInit {
  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngAfterViewInit(): void {
    this.router.events.pipe(
      filter((e: NavigationEvent) => e instanceof Scroll),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      const element: HTMLElement = document.querySelector('#' + tree.fragment) as HTMLElement;

      if (element) {
        const anchorOffset: 220 | 140 = tree.fragment === 'about' ? 220 : 140;
        const offsetValue: number = element.offsetTop - anchorOffset;

        if (tree.fragment && element) {
          window.scrollTo({ top: offsetValue, behavior: 'smooth' });
        }
      }
    });
  }
}
