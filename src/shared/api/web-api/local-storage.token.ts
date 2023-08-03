import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window.token';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.localStorage object',
  {
    factory: () => inject(WINDOW).localStorage,
  },
);
