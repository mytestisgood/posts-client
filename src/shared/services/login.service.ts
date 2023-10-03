import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public currentToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public isUserLogin$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public get currentToken(): Observable<string | null> {
    return this.currentToken$.asObservable();
  }

  public get isLogged(): boolean {
    return Boolean(this.currentToken$.value && this.isUserLogin$.value === 'true');
  }
}