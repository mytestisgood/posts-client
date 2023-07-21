import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'smarti-header-auth-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-auth-layout.component.html',
  styleUrls: ['./header-auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderAuthLayoutComponent {
  @Input() haveLeftBLock: boolean = false;
  @Input() leftBlockText!: string;
  @Input() leftBlockClickedText!: string;
  @Input() redirectLink: string = '/';

  constructor(private readonly router: Router) {
  }
  public navigateToRegistrationPage(): void {
    this.router.navigate([this.redirectLink]);
  }

  public navigateToMainPage(): void {
    this.router.navigate(['/']);
  }
}
