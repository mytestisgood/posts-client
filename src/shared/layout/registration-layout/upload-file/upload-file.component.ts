import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UploadDocumentComponent } from '@feature';
import { SignInService } from '@shared/api/services';
import { DestroyService } from '@shared/services';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-upload-file',
  standalone: true,
  imports: [CommonModule, UploadDocumentComponent],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileComponent {

  constructor(
    private readonly signInService: SignInService,
    private readonly destroy$: DestroyService,
  ) {
    this.signInService.apiUsersSendVerifyCodeGet().pipe(takeUntil(this.destroy$));
  }
}
