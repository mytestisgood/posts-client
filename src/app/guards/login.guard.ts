import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '@shared/web-api';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
  ) {
  }

  public canActivate(): boolean {
    if (this.sessionStorageService.isLogged) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
