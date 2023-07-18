import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent, FooterComponent, LandingLayoutComponent } from '@shared/layout';
import { SharedModule } from '@shared/module';
import {
  MainLayoutPopupComponent,
} from '@shared/popup';

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
    SharedModule,
    MainLayoutPopupComponent,
  ],
})
export class LandingComponent {

}
