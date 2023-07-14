import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputFieldComponent } from '../../../ui/input-field/input-field.component';

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
