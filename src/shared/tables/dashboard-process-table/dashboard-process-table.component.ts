import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProcessesService } from '@shared/api';
import { ProcessTableItems } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { InputCheckboxComponent, TablePaginationComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-process-table',
  standalone: true,
  imports: [CommonModule, InputCheckboxComponent, TablePaginationComponent],
  templateUrl: './dashboard-process-table.component.html',
  styleUrls: ['./dashboard-process-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessTableComponent {
  @Input() public items!: ProcessTableItems[] | null;
  @Input() public token!: string;
  @Input() public departmentId!: string;

  constructor(
    private readonly router: Router,
    private readonly processesService: ProcessesService,
    private readonly destroy$: DestroyService,
  ) {}

  public get isSelectedAll(): boolean {
    return this.items?.every(item => item.isSelected) ?? false;
  }

  public checkRow(isSelected: boolean, index: number): void {
    if (!this.items) {
      return;
    }

    this.items[index].isSelected = isSelected;
  }

  public checkAll(isSelected: boolean): void {
    this.items?.forEach(item => (item.isSelected = isSelected));
  }

  public openDetailInformation(): void {
    const randomId = 'id' + Math.floor(Math.random() * 100);

    this.router.navigate(['/dashboard/processes/' + randomId]);
  }

  public preventParentClick($event: Event): void {
    $event.stopPropagation();
  }

  public separateWordsBySpace(word: string | undefined): string {
    if (!word) {
      return '';
    }
    const newWord: string[]  = word.split(" ");

    return `<b>` + newWord[1] + `</b> <span>` + newWord[0] + `</span>`;
  }

  public deleteProcessItem($event: Event, id: number | undefined): void {
    if (!id) {
      return;
    }

    this.processesService.apiProcessesProcessIdDelete(id, this.departmentId, this.token).pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
