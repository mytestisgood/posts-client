import { Inject, Injectable } from '@angular/core';
import { DEPARTMENT_ID, TOKEN } from '@shared/entities';
import { SESSION_STORAGE } from './session-storage.token';
import { WINDOW } from './window.token';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements Storage {
  constructor(
    @Inject(SESSION_STORAGE) private readonly sessionStorage: Storage,
    @Inject(WINDOW) private readonly windowRef: Window,
  ) {}

  public get length(): number {
    return this.sessionStorage.length;
  }

  public getItem(key: string): string | null {
    return this.sessionStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.sessionStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
  }

  public clear(): void {
    this.sessionStorage.clear();
  }

  public key(index: number): string | null {
    return this.sessionStorage.key(index);
  }

  public removeToken(): void {
    this.sessionStorage.removeItem(TOKEN);
    this.sessionStorage.removeItem(DEPARTMENT_ID);
  }
}
