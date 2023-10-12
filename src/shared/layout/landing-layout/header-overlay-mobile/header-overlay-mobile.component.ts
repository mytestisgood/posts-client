import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollAnchorDirective } from '@shared/directives';
import { NavigationAnchorService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-header-overlay-mobile',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ScrollAnchorDirective],
  templateUrl: './header-overlay-mobile.component.html',
  styleUrls: ['./header-overlay-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderOverlayMobileComponent {
  public mainLink: string = '/main';
  public loginLink: string = '/login';
  public registrationLink: string = '/registration';
  public contactLink: string = '/contact';

  constructor(
    private readonly router: Router,
    private readonly navigationAnchorService: NavigationAnchorService,
  ) {
  }
  public navigateToPageWithoutAnchor(link: string): void {
    this.closeMobileNav();
    this.router.navigate([link]);
  }

  public navigateToPageWithAnchor(link: string, anchor?: string): void {
    this.closeMobileNav();
    this.navigationAnchorService.navigateToPageWithAnchor(link, anchor);
  }
  public openSheetMobileMenu(): void {
    (document.getElementById('mobileNav') as HTMLElement).style.width = '90%';
  }

  public closeMobileNav(): void {
    (document.getElementById('mobileNav') as HTMLElement).style.width = '0%';
  }
}
