import {ChangeDetectionStrategy, Component} from '@angular/core';
import { environment } from "../environment/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    console.log(environment.production)
  }
}
