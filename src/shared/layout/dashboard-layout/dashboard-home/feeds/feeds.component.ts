import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse2004 } from '@shared/api';

@Component({
  selector: 'smarti-feeds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedsComponent {
  @Input() public employerReport!: InlineResponse2004 | null;

  constructor() {
    console.log(this.employerReport);
  }
}
