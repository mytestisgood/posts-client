import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
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
import {SessionStorageService} from '@shared/web-api';

@Injectable({providedIn: 'root'})
export class RegistrationGuard {
  private currentStorageData!: AllRegistrationSessionData;

  constructor(
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkDataToOpenLink(route.routeConfig?.path as string, route.queryParams);
  }

  private checkDataToOpenLink(route: string, queryParams: any): boolean {
    const currentRoute: string = '/registration/' + route;
    const isContinue = queryParams.isContinue;

    this.currentStorageData = JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);


    if (currentRoute === registrationSetPasswordLink && this.currentStorageData?.finishInfoPage || isContinue) {
      return true;
    } else if (currentRoute === registrationUploadFileLink && this.currentStorageData?.finishPasswordPage || isContinue) {
      return true;
    } else if (currentRoute === registrationTransferMoneyLink && this.currentStorageData?.finishFilesPage || isContinue) {
      return true;
    } else if (currentRoute === registrationPaymentInstructionLink || isContinue) {
      if (this.currentStorageData?.transferMoneyMode === 'directly' ?? false) {
        return true;
      }
    } else if (currentRoute === registrationConfirmPaymentLink && this.currentStorageData?.finishTransferMoneyMode) {
      return true;
    } else if (currentRoute === registrationVerifyCodeLink && this.currentStorageData?.finishConfirmPayment) {
      return true;
    }
    this.router.navigate([registrationInfoLink]);
    return false;
  }
}
