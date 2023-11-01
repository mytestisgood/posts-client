import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import {
  AllRegistrationSessionData,
  REGISTRATION_DATA,
  registrationConfirmPaymentLink,
  registrationInfoLink,
  registrationPaymentInstructionLink,
  registrationSetPasswordLink,
  registrationTransferMoneyLink,
  registrationUploadFileLink,
  registrationVerifyCodeLink,
} from '@shared/entities';
import { SessionStorageService } from '@shared/web-api';

@Injectable({ providedIn: 'root' })
export class RegistrationGuard {
  private currentStorageData!: AllRegistrationSessionData;

  constructor(
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkDataToOpenLink(route.routeConfig?.path as string);
  }

  private checkDataToOpenLink(route: string): boolean {
    const currentRoute: string = '/registration/' + route;
    const isDirectlyPayment: boolean = this.currentStorageData?.transferMoneyMode === 'directly' ?? false;

    this.currentStorageData = JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

    if (currentRoute === registrationSetPasswordLink && this.currentStorageData?.finishInfoPage) {
      return true;
    } else if (currentRoute === registrationUploadFileLink && this.currentStorageData?.finishPasswordPage) {
      return true;
    } else if (currentRoute === registrationTransferMoneyLink && this.currentStorageData?.finishFilesPage) {
      return true;
    } else if (currentRoute === registrationPaymentInstructionLink && isDirectlyPayment) {
      return true;
    } else if (currentRoute === registrationConfirmPaymentLink && this.currentStorageData?.finishTransferMoneyMode) {
      return true;
    } else if (currentRoute === registrationVerifyCodeLink && this.currentStorageData?.finishConfirmPayment) {
      return true;
    }
    this.router.navigate([registrationInfoLink]);
    return false;
  }
}
