import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSectionDirective } from '@shared/directives';
import packageJson from '../../../../../package.json';

@Component({
  selector: 'smarti-footer',
  standalone: true,
  imports: [CommonModule, ScrollSectionDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public version: string = packageJson.version;
}
