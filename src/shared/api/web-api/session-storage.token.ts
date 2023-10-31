import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window.token';

export const SESSION_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.sessionStorage object',
  {
    factory: () => inject(WINDOW).sessionStorage,
  },
);
