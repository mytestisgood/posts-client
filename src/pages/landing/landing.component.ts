import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollManagerDirective } from '@shared/directives';
import {ListComponent} from "../list/list.component";

@Component({
  selector: 'smarti-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ScrollManagerDirective,
    ],
})
export class LandingComponent {

}
