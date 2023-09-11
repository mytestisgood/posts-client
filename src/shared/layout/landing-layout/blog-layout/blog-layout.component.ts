import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSectionDirective } from '@shared/directives';

@Component({
  selector: 'smarti-blog-layout',
  standalone: true,
  imports: [CommonModule, ScrollSectionDirective],
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogLayoutComponent {

}
