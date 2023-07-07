import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-questions-banner-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions-banner-layout.component.html',
  styleUrls: ['./questions-banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsBannerLayoutComponent {

}
