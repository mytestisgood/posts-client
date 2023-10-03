import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services';
import { LocalStorageService } from '@shared/web-api';
import { TuiHostedDropdownModule } from '@taiga-ui/core';

@Component({
  selector: 'smarti-custom-user-menu',
  standalone: true,
  imports: [CommonModule, TuiHostedDropdownModule],
  templateUrl: './custom-user-menu.component.html',
  styleUrls: ['./custom-user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomUserMenuComponent {
  @Input() public username: string = 'user';

  public isActive: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly LoginService: LoginService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public logout(): void {
    this.localStorageService.removeToken();
    this.LoginService.currentToken$.next(null);
    this.LoginService.isUserLogin$.next('false');
    if (!this.LoginService.isLogged) {
      this.router.navigate(['/']);
    }
  }
}
