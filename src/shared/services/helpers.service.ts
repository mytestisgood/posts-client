import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  pageSpinnerSubject: Subject<boolean> = new Subject();
  lastUrlSubject: Subject<string> = new Subject();

  setPageSpinner(isShown: boolean): void {
    setTimeout(() => this.pageSpinnerSubject.next(isShown), 0);
  }
  public areObjectsEqual(obj1: any, obj2: any): boolean {
    // Check if the objects are of the same type
    if (typeof obj1 !== typeof obj2) {
      return false;
    }

    // Check if both objects are null or undefined
    if ((obj1 === null || obj1 === undefined) && (obj2 === null || obj2 === undefined)) {
      return true;
    }

    // Check if only one of the objects is null or undefined
    if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
      return false;
    }

    // Check if the objects are arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }

      for (let i = 0; i < obj1.length; i++) {
        if (!this.areObjectsEqual(obj1[i], obj2[i])) {
          return false;
        }
      }

      return true;
    }

    // Check if the objects are objects (excluding arrays and null)
    if (typeof obj1 === 'object' && typeof obj2 === 'object' && !Array.isArray(obj1) && !Array.isArray(obj2)) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (!this.areObjectsEqual(obj1[key], obj2[key])) {
          return false;
        }
      }

      return true;
    }

    // Compare primitive types and functions
    return obj1 === obj2;
  }
}

