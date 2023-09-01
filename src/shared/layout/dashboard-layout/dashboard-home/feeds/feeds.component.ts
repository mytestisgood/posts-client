import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-feeds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedsComponent {
  @Input() public repeatedOnLevel!: number | undefined;
  @Input() public inProcess!: number | undefined;
  @Input() public provided!: number | undefined;
}
