import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'smarti-no-elements-to-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-elements-to-show.component.html',
  styleUrls: ['./no-elements-to-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoElementsToShowComponent {

}
