import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IS_LOGGED_IN, TOKEN } from '@shared/entities';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public currentToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public isUserLogin$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
  }

  // public get currentToken(): string | null {
  //   return this.localStorageService.getItem(TOKEN);
  // }

  public get isLogged(): boolean {
    return Boolean(this.currentToken$?.value && this.isUserLogin$.value === 'true');
  }
}
