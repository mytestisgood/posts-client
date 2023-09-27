import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  public isOpenValueChange = new BehaviorSubject(false);

  public setState(isOpen: boolean): void {
    this.isOpenValueChange.next(isOpen);
  }
}