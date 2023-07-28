import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-clock-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-feature.component.html',
  styleUrls: ['./clock-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockFeatureComponent {

}
