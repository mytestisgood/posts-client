import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-main-layout-popup',
  templateUrl: './main-layout-popup.component.html',
  styleUrls: ['./main-layout-popup.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutPopupComponent {
  @Input() public direction: 'left' | 'right' = 'left';
}
