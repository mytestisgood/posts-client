import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomGroupSelectComponent,
  CustomUserAccordionComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-header',
  standalone: true,
  imports: [CommonModule, CustomUserAccordionComponent, CustomGroupSelectComponent],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {

}
