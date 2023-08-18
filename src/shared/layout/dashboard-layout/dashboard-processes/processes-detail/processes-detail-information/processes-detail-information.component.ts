import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-processes-detail-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processes-detail-information.component.html',
  styleUrls: ['./processes-detail-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailInformationComponent {}
