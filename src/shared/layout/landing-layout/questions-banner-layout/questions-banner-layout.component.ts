import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LeadService } from '@shared/api/services';
import {AlertsService, DestroyService} from '@shared/services';
import {ButtonComponent, InputFieldComponent, InputNumberComponent} from '@shared/ui';
import {catchError, of, takeUntil, tap} from 'rxjs';
import {emailValidatorPattern, israelMobilePhoneValidatorPattern, LeadsForm, NAME_REGEX} from "@shared/entities";

@Component({
  selector: 'smarti-questions-banner-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputFieldComponent, InputNumberComponent],
  templateUrl: './questions-banner-layout.component.html',
  styleUrls: ['./questions-banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsBannerLayoutComponent {
  public leadsForm: FormGroup<LeadsForm> = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.pattern(NAME_REGEX)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(israelMobilePhoneValidatorPattern)]),
  });

  constructor(
    private readonly leadService: LeadService,
    private readonly alertsService: AlertsService,

    private readonly destroy$: DestroyService,
  ) {
  }

  public sendCreateLeadRequest(): void {
    this.leadService.apiLeadsCreateLeadPost({
      name: this.leadsForm.controls.name.value as string,
      phone: this.leadsForm.controls.phone.value as string,
      email: this.leadsForm.controls.email.value as string,
    }).pipe(tap(res => {
      if(res.message=='ok'){this.alertsService.showSuccessNotificationIcon('פנייתכם התקבלה')}
      }),
      catchError((err) => {
        this.alertsService.showErrorNotificationIcon('שגיאה');
        return of(err);
      }),
      takeUntil(this.destroy$)).subscribe();
  }
}
