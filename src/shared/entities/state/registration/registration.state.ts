import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

@State<string[]>({
  name: 'user',
  defaults: [],
})
@Injectable()
export class RegistrationState {}
