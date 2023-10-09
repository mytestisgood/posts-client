import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiLoaderModule } from '@taiga-ui/core';

@Component({
  selector: 'smarti-loader',
  standalone: true,
  imports: [CommonModule, TuiLoaderModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() public size: 'm' | 's' | 'xs' | 'l' | 'xl' | 'xxl' =  'm';
  @Input() public inheritColor: boolean = false;
  @Input() public overlay: boolean = false;
  @Input() public paddingTop30percent: boolean = false;
  @Input() public paddingTop15percent: boolean = false;
  @Input() public paddingTop5percent: boolean = false;
  @Input() public overflowInitial: boolean = false;
}
