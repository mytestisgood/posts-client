import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginFormComponent } from '@feature';
import { loginAfterRegistrationLink } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { takeUntil, withLatestFrom } from 'rxjs';

@Component({
  selector: 'smarti-login-after-registration',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-after-registration.component.html',
  styleUrls: ['./login-after-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAfterRegistrationComponent implements AfterViewInit {
  @ViewChild('loginFormTemplate') public loginFormTemplate!: TuiDialogContext;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly router: Router,
  ) {
  }

  public ngAfterViewInit(): void {
    this.dialogs.open(this.loginFormTemplate, {
      closeable: false,
      dismissible: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
    this.router.events.pipe(
      withLatestFrom(this.dialogs),
      takeUntil(this.destroy$),
    ).subscribe(([event, dialogs]) => {
      if(event instanceof NavigationEnd && this.router.url !== loginAfterRegistrationLink && dialogs.length) {
        dialogs.forEach(dialog => {
          dialog.$implicit.complete();
        });
      }
    });
  }

  public navigateToMainPage(): void {
    this.router.navigate(['/main']);
  }
}
