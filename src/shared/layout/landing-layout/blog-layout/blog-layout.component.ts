import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared.module";

@Component({
  selector: 'smarti-blog-layout',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogLayoutComponent {

}
