import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-company-slider-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-slider-layout.component.html',
  styleUrls: ['./company-slider-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySliderLayoutComponent {

}
