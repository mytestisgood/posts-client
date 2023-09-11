import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClockFeatureComponent } from '@feature';
import { ScrollAnchorDirective } from '@shared/directives';
import { SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum } from '@shared/entities';
import { ButtonComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';

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
    private readonly localStorageService: LocalStorageService,
  ) {
    this.localStorageService.setItem(SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum.Show);
  }

  public navigateToRegistrationPage(): void {
    this.router.navigate([this.registrationLink]);
  }

  public navigateToLoginPage(): void {
    this.router.navigate([this.loginLink]);
  }

  public navigateToContactPage(): void {
    this.router.navigate([this.contactLink]);
  }

  public navigateToMainPage(): void {
    this.router.navigate([this.mainLink]);
  }

  public navigateFromContactToMainPage(): void {
    if (this.router.url === this.mainLink) {
      return;
    }
    this.router.navigate([this.mainLink]);
  }

  public closeSpecialHeader(): void {
    const specialHeader: HTMLElement = document.getElementById('specialHeader') as HTMLElement;

    this.localStorageService.setItem(SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum.Hidden);
    specialHeader.hidden = true;
  }
}
