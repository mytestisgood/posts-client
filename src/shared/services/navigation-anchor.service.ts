import { Injectable } from '@angular/core';
import { NavigationSkipped, Router, Scroll } from '@angular/router';
import { NavigationEvent } from '@shared/entities';
import { filter, takeUntil } from 'rxjs';
import { DestroyService } from './destroy.service';

@Injectable({ providedIn: 'root' })
export class NavigationAnchorService {
  private readonly mainLink: string = '/main';
  private readonly contactLink: string = '/contact';

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
  ) {
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
}
