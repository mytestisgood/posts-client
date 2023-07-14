import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared.module";
import {ClockFeatureComponent} from "../../../../features/clock-feature/clock-feature.component";
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'smarti-header',
  standalone: true,
  imports: [CommonModule, SharedModule, ClockFeatureComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
