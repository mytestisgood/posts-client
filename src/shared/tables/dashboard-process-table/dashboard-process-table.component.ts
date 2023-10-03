import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessesService } from '@shared/api/services';
import { ProcessTableItems } from '@shared/entities';
import { NoElementsToShowComponent } from '@shared/layout';
import { DestroyService } from '@shared/services';
import {
  ChangePageItemsValue,
  InputCheckboxComponent,
  LoaderComponent,
  TablePaginationComponent,
} from '@shared/ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-process-table',
  standalone: true,
  imports: [
    CommonModule, InputCheckboxComponent, TablePaginationComponent, LoaderComponent,
    NoElementsToShowComponent,
  ],
  templateUrl: './dashboard-process-table.component.html',
  styleUrls: ['./dashboard-process-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessTableComponent {
  @Input() public items!: ProcessTableItems[] | null;
  @Input() public departmentId!: string;

  public itemsValue: ChangePageItemsValue = { firstValue: 0, lastValue: 6 };
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
    const newWord: string[]  = word.split(' ');

    return `<b>` + newWord[1] + `</b> <span>` + newWord[0] + `</span>`;
  }

  public deleteProcessItem($event: Event, id: number | undefined): void {
    if (!id) {
      return;
    }

    this.processesService.apiProcessesProcessIdDelete({
      processId: id,
      departmentId: this.departmentId,
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public changePageItemsValue(value: ChangePageItemsValue): void {
    if (value.lastValue !== undefined) {
      this.itemsValue = { firstValue: value.firstValue, lastValue: value.lastValue };
    }
  }
}
