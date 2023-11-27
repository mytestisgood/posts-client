import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ProgressBarComponent} from '@feature';
import {
  IS_LOGGED_IN,
  REGISTRATION_DATA,
  registrationConfirmPaymentLink,
  registrationVerifyCodeLink,
  TOKEN, UserProcessDataByStepResponse
} from '@shared/entities';
import {HeaderAuthLayoutComponent, RegistrationFooterComponent} from '@shared/layout';
import {RegisterService} from "@shared/api/services";
import {catchError, of, tap} from "rxjs";
import {CreateEmployerOutResponse} from "@shared/api/models";
import {AlertsService} from "@shared/services";
import {SessionStorageService} from "@shared/web-api";

@Component({
  selector: 'smarti-registration',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    RegistrationFooterComponent,
    HeaderAuthLayoutComponent,
    RouterOutlet,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  public currentUrl: string = this.router.url;
  public isFirstTemplate: boolean = true;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly alertsService: AlertsService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly registerService: RegisterService,
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const isConfirmPaymentPage: boolean = this.router.url === registrationConfirmPaymentLink;
        const isVerifyCodePage: boolean = this.router.url === registrationVerifyCodeLink;
        const isContinue = this.route.snapshot.queryParams['isContinue'];

        if (isContinue) {
          this.sessionStorageService.setItem(TOKEN, this.route.snapshot.queryParams['token'] as string);
          this.registerService.getUserProcessDataByStep().pipe(tap((tokenResponse: UserProcessDataByStepResponse) => {
              this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(tokenResponse.data?.registrationData));
              this.sessionStorageService.setItem(IS_LOGGED_IN, tokenResponse.data?.isLoggedIn as string);
            }),
            catchError((err) => {
              if (err.error.message === 'user exists') {
                this.alertsService.showErrorNotificationIcon('המשתמש שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
              } else if (err.error.message === 'identifier exists') {
                this.alertsService.showErrorNotificationIcon('המעסיק שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
              } else {
                this.alertsService.showErrorNotificationIcon('שגיאה');
              }
              return of(err);
            })).subscribe();

        }


        this.isFirstTemplate = !(isConfirmPaymentPage || isVerifyCodePage);
        if (this.isFirstTemplate) {
          this.elementRef.nativeElement.ownerDocument.body.className = 'no-bg-image';
          this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#F7F9FC';
        } else {
          this.elementRef.nativeElement.ownerDocument.body.className = 'dashboard-bg-image';
        }
      }
    });
  }
}
