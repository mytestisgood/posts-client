import { Inject, Injectable } from '@angular/core';
import { WINDOW } from './window.token';
import { LOCAL_STORAGE } from './local-storage.token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  constructor(
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage,
    @Inject(WINDOW) private readonly windowRef: Window,
  ) {}

  public get length(): number {
    return this.localStorage.length;
  }

  public getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }

  public clear(): void {
    this.localStorage.clear();
  }

  public key(index: number): string | null {
    return this.localStorage.key(index);
  }
}