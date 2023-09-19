import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TOKEN } from '@shared/entities';
import { DestroyService, LoginService } from '@shared/services';
import { LocalStorageService } from '@shared/web-api';
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
    private readonly localStorageService: LocalStorageService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    this.LoginService.currentToken.pipe(
      tap(() => this.LoginService.currentToken$.next(this.localStorageService.getItem(TOKEN))),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
