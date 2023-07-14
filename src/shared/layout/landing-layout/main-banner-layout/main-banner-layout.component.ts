import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared.module";
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'smarti-main-banner-layout',
  standalone: true,
  imports: [CommonModule, SharedModule, ButtonComponent],
  templateUrl: './main-banner-layout.component.html',
  styleUrls: ['./main-banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBannerLayoutComponent {

}
