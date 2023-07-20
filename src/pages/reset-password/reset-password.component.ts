import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsFooterLayoutComponent, HeaderAuthLayoutComponent } from '@shared/layout';
import { ResetPasswordFormComponent } from '@feature';

@Component({
  selector: 'smarti-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ContactUsFooterLayoutComponent,
    HeaderAuthLayoutComponent,
    ResetPasswordFormComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {

}
