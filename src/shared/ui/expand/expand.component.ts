import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiExpandModule } from '@taiga-ui/core';

@Component({
  selector: 'smarti-expand',
  standalone: true,
  imports: [CommonModule, TuiExpandModule],
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandComponent {
  @Input() public expandContentTemplate!: TemplateRef<any>;
  @Input() public isExpanded: boolean = false;
}
