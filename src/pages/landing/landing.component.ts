import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from "../../shared/layout/header/header.component";
import {FooterComponent} from "../../shared/layout/footer/footer.component";
import {LandingLayoutComponent} from "../../shared/layout/landing-layout/landing-layout.component";
import {SharedModule} from "../../shared/shared.module";
import {MainLayoutPopupComponent} from "../../shared/popup/main-layout-popup/main-layout-popup.component";

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
    MainLayoutPopupComponent
  ]
})
export class LandingComponent {

}
