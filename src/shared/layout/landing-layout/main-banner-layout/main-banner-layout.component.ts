import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollSectionDirective } from '@shared/directives';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-main-banner-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ScrollSectionDirective],
  templateUrl: './main-banner-layout.component.html',
  styleUrls: ['./main-banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBannerLayoutComponent {

  constructor(private readonly router: Router) {}

  public navigateToRegistration(): void {
    this.router.navigate(['/registration']);
  }
}
