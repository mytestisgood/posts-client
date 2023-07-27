import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedModule } from '@shared/module';
import { ClockFeatureComponent } from '@feature';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-header',
  standalone: true,
  imports: [CommonModule, SharedModule, ClockFeatureComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  constructor(private readonly router: Router) {
  }

  public navigateToRegistrationPage(): void {
    this.router.navigate(['/registration']);
  }

  public navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  public navigateToContactPage(): void {
    this.router.navigate(['/contact']);
  }

  public navigateToMainPage(): void {
    this.router.navigate(['/main']);
  }
}
