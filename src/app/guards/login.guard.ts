import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
  ) {
  }

  public canActivate(): boolean {
    if (this.loginService.isLogged) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}