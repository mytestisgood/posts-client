import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsDialogComponent } from '@shared/dialog';
import { SharedModule } from '@shared/module';
import { DestroyService } from '@shared/services';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-about-layout',
  standalone: true,
  imports: [CommonModule, SharedModule, LeadsDialogComponent],
  templateUrl: './about-layout.component.html',
  styleUrls: ['./about-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutLayoutComponent {
  public firstLeadDialogsDescription: string = 'Pension settlements provide a reliable source of ' +
    'income during your golden years, allowing you to maintain your standard of living and enjoy ' +
    'the fruits of your labor.';
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public openLeadsDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      dismissible: false,
      size: 'auto',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
