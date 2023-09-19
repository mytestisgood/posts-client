import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
  ) {}

  public canActivate(): boolean {
    if (this.loginService.isLogged) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
