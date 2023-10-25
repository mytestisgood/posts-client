import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProgressBarComponent } from '@feature';
import { registrationConfirmPaymentLink, registrationVerifyCodeLink } from '@shared/entities';
import { HeaderAuthLayoutComponent, RegistrationFooterComponent } from '@shared/layout';

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
  ) {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd) {
        const isConfirmPaymentPage: boolean = this.router.url === registrationConfirmPaymentLink;
        const isVerifyCodePage: boolean = this.router.url === registrationVerifyCodeLink;

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
