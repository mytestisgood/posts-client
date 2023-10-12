import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollAnchorDirective } from '@shared/directives';
import { NavigationAnchorService } from '@shared/services';
import packageJson from '../../../../../package.json';

@Component({
  selector: 'smarti-footer',
  standalone: true,
  imports: [CommonModule, ScrollAnchorDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public version: string = packageJson.version;
  public contactLink: string = '/contact';
  public mainLink: string = '/main';

  constructor(
    private readonly router: Router,
    private readonly navigationAnchorService: NavigationAnchorService,
  ) {
  }

  public navigateToPageWithoutAnchor(link: string): void {
    this.router.navigate([link]);
  }

  public navigateToPageWithAnchor(link: string, anchor?: string): void {
    this.navigationAnchorService.navigateToPageWithAnchor(link, anchor);
  }
}
