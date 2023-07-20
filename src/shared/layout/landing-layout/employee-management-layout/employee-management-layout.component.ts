import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsDialogComponent } from '@shared/dialog';
import { DestroyService } from '@shared/services';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-employee-management-layout',
  standalone: true,
  imports: [CommonModule, LeadsDialogComponent],
  templateUrl: './employee-management-layout.component.html',
  styleUrls: ['./employee-management-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeManagementLayoutComponent {

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private destroy$: DestroyService,
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
