import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared.module";

@Component({
  selector: 'smarti-header',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
