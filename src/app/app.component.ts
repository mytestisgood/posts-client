import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IS_LOGGED_IN, TOKEN } from '@shared/entities';
import { DestroyService, LoginService } from '@shared/services';
import { SessionStorageService } from '@shared/web-api';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly LoginService: LoginService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    this.LoginService.currentToken.pipe(
      tap(() => {
        this.LoginService.currentToken$.next(this.sessionStorageService.getItem(TOKEN));
        this.LoginService.isUserLogin$.next(this.sessionStorageService.getItem(IS_LOGGED_IN));
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
