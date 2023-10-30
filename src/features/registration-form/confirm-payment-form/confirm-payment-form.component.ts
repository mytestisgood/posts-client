import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFormDialogComponent } from '@shared/dialog';
import {
  FileUploadStatusAndId,
  IS_PAY_BY_SMARTI,
  registrationVerifyCodeLink,
  UploadDocumentsControls,
  uploadingDocumentsFormMapper,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFileComponent } from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'smarti-confirm-payment-form',
  standalone: true,
  imports: [
    CommonModule, ProgressBarComponent, InputFileComponent, ButtonComponent,
    AccountFormDialogComponent,
  ],
  templateUrl: './confirm-payment-form.component.html',
  styleUrls: ['./confirm-payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPaymentFormComponent {
  public currentUrl: string = this.router.url;
  public uploadDocumentsForm: FormGroup<UploadDocumentsControls> = uploadingDocumentsFormMapper();
  public opswatId: Array<string> = [];
  public documentUploaded: boolean = false;
  public isDirectPayment: boolean = false;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
  ) {
    this.isDirectPayment = this.sessionStorageService.getItem(IS_PAY_BY_SMARTI) !== 'true';
  }

  public fileUploaded(uploadedAndId: FileUploadStatusAndId): void {
    if (uploadedAndId.status && this.uploadDocumentsForm.controls.files.value) {
      this.opswatId.push(uploadedAndId.id as string);
    }
    this.documentUploaded = uploadedAndId.status;
  }

  public openDialogAccountForm(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public navigateToVerifyCode(): void {
    this.router.navigate([registrationVerifyCodeLink]);
  }
}
