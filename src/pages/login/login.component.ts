import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from '@feature';
import {
  LoginFooterComponent, LoginHeaderComponent
} from '@shared/layout';

@Component({
  selector: 'smarti-login',
  standalone: true,
  imports: [
    CommonModule,
    LoginHeaderComponent,
    LoginFooterComponent,
    LoginFormComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

}