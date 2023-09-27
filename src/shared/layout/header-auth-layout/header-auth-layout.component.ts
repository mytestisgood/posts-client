import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DestroyService, LoginService } from '@shared/services';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-header-auth-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-auth-layout.component.html',
  styleUrls: ['./header-auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderAuthLayoutComponent {
  @Input() public haveLeftBLock: boolean = false;
  @Input() public leftBlockText!: string;
  @Input() public leftBlockClickedText!: string;
  @Input() public redirectLink: string = '/';

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public navigateToRegistrationPage(): void {
    this.router.navigate([this.redirectLink]);
  }

  public navigateToMainPage(): void {
    this.loginService.currentToken$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(token => {
      this.router.navigate([token ? '/dashboard' : '/']);
    });
  }
}
