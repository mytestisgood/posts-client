import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClockFeatureComponent } from '@feature';
import { ScrollAnchorDirective } from '@shared/directives';
import { SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum } from '@shared/entities';
import { DestroyService, NavigationAnchorService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import {
  HeaderOverlayMobileComponent,
} from '../header-overlay-mobile/header-overlay-mobile.component';

@Component({
  selector: 'smarti-header',
  standalone: true,
  imports: [
    CommonModule, ClockFeatureComponent, ButtonComponent, ScrollAnchorDirective,
    HeaderOverlayMobileComponent,
  ],
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
    private readonly navigationAnchorService: NavigationAnchorService,
  ) {
    this.localStorageService.setItem(SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum.Show);
  }

  public navigateToPageWithoutAnchor(link: string): void {
    this.router.navigate([link]);
  }

  public navigateToPageWithAnchor(link: string, anchor?: string): void {
    this.navigationAnchorService.navigateToPageWithAnchor(link, anchor);
  }

  public closeSpecialHeader(): void {
    const specialHeader: HTMLElement = document.getElementById('specialHeader') as HTMLElement;

    this.localStorageService.setItem(SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum.Hidden);
    specialHeader.hidden = true;
  }
}
