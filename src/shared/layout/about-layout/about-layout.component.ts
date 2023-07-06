import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared.module";

@Component({
  selector: 'smarti-about-layout',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './about-layout.component.html',
  styleUrls: ['./about-layout.component.scss']
})
export class AboutLayoutComponent {

}
