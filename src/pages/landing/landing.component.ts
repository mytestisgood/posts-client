import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollManagerDirective } from '@shared/directives';
import { FooterComponent, HeaderComponent, LandingLayoutComponent } from '@shared/layout';
import { MainLayoutPopupComponent } from '@shared/popup';

@Component({
  selector: 'smarti-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    LandingLayoutComponent,
    MainLayoutPopupComponent,
    ScrollManagerDirective,
  ],
})
export class LandingComponent {

}
