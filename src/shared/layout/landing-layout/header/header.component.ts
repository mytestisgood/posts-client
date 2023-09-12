import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationSkipped, Router, Scroll } from '@angular/router';
import { ClockFeatureComponent } from '@feature';
import { ScrollAnchorDirective } from '@shared/directives';
import { NavigationEvent, SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { filter, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-header',
  standalone: true,
  imports: [CommonModule, ClockFeatureComponent, ButtonComponent, ScrollAnchorDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public mainLink: string = '/main';
  public loginLink: string = '/login';
  public registrationLink: string = '/registration';
  public contactLink: string = '/contact';

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.localStorageService.setItem(SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum.Show);
  }

  public navigateToPageWithoutAnchor(link: string): void {
    this.router.navigate([link]);
  }

  public navigateToPageWithAnchor(link: string, anchor?: string): void {
    const hash: string = window.location.hash.replace('#', '');

    switch (this.router.url) {
      case link:
        if (anchor === undefined) {
          this.router.navigate([this.mainLink]);
        }
        break;

      case this.contactLink:
        this.router.navigate([link], { fragment: anchor, replaceUrl: true });
        if (anchor) {
          this.scrollToElement(anchor as string);
        }
        break;

      default:
        if (anchor && hash !== '') {
          location.hash = '';
          this.router.events.pipe(
            filter((e: NavigationEvent) => e instanceof Scroll),
            takeUntil(this.destroy$),
          ).subscribe((e: NavigationEvent) => {
            if (!(!(e instanceof Scroll) || e.routerEvent instanceof NavigationSkipped) &&
              e.routerEvent.url === '/main') {
              this.scrollToElement(anchor as string);
            }
          });
        }
        break;
    }
  }

  public scrollToElement(anchor: string): void {
    const element: HTMLElement = document.getElementById(anchor) as HTMLElement;
    const anchorOffset: 220 | 140 = anchor === 'about' ? 220 : 140;
    const offsetValue: number = element?.offsetTop - anchorOffset;

    window.scrollTo({ top: offsetValue, behavior: 'smooth' });
  }

  public closeSpecialHeader(): void {
    const specialHeader: HTMLElement = document.getElementById('specialHeader') as HTMLElement;

    this.localStorageService.setItem(SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum.Hidden);
    specialHeader.hidden = true;
  }
}
