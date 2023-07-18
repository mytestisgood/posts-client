import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-start-day-with-smarti-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-day-with-smarti-layout.component.html',
  styleUrls: ['./start-day-with-smarti-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartDayWithSmartiLayoutComponent {

}
