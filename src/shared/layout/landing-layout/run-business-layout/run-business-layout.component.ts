import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'smarti-run-business-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './run-business-layout.component.html',
  styleUrls: ['./run-business-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunBusinessLayoutComponent {

}
