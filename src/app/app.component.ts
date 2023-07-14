import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
  constructor() {
    console.log(environment.production, 'environment')
  }
}
