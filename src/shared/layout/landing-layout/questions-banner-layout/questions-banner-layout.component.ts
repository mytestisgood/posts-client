import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';

@Component({
  selector: 'smarti-questions-banner-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputFieldComponent],
  templateUrl: './questions-banner-layout.component.html',
  styleUrls: ['./questions-banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsBannerLayoutComponent {

}
