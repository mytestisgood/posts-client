import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared.module";
import {ClockFeatureComponent} from "../../../features/clock-feature/clock-feature.component";

@Component({
  selector: 'smarti-header',
  standalone: true,
  imports: [CommonModule, SharedModule, ClockFeatureComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
