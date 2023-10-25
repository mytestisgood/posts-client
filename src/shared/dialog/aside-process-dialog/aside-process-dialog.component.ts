import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-aside-process-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ButtonComponent],
  templateUrl: './aside-process-dialog.component.html',
  styleUrls: ['./aside-process-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideProcessDialogComponent {
  @Input() public observer!: { complete: () => void };
  public email!: FormControl<string | null>;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(content: PolymorpheusContent<TuiDialogContext>): void {
    this.observer.complete();
    this.dialogs.open(content, {
      closeable: false,
      size: 'm',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public closeSecondDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
