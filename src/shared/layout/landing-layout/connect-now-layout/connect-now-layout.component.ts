import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'smarti-connect-now-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './connect-now-layout.component.html',
  styleUrls: ['./connect-now-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectNowLayoutComponent {

}
