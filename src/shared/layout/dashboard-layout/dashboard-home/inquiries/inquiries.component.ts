import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-inquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InquiriesComponent {
  @Input() public chats!: Array<object> | null;
}
