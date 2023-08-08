import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAccordionModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-custom-user-accordion',
  standalone: true,
  imports: [CommonModule, TuiAccordionModule],
  templateUrl: './custom-user-accordion.component.html',
  styleUrls: ['./custom-user-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomUserAccordionComponent {
  @Input() public username: string = 'user';

}
