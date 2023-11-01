import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '@shared/web-api';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
  ) {}

  public canActivate(): boolean {
    if (this.sessionStorageService.isLogged) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
