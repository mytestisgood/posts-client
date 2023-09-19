import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { InlineResponse2005 } from '@shared/api';
import { months } from '@shared/entities';
import { formattedFromTextToNumericMonth } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { InputYearComponent, SelectComponent } from '@shared/ui';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-home-table',
  standalone: true,
  imports: [CommonModule, InputYearComponent, SelectComponent],
  templateUrl: './dashboard-home-table.component.html',
  styleUrls: ['./dashboard-home-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeTableComponent implements OnInit {
  @Input() public feedbackEmployerReport!: InlineResponse2005 | null;
  @Output() public changeYear: EventEmitter<number> = new EventEmitter<number>();
  @Output() public changeMonth: EventEmitter<number> = new EventEmitter<number>();
  public monthControl: FormControl = new FormControl;
  public yearControl: FormControl = new FormControl;
  protected readonly months: string[] = months;

  constructor(private readonly destroy$: DestroyService) {}

  public ngOnInit(): void {
    this.yearControl.valueChanges.pipe(
      tap(value => {
        this.changeYear.next(value);
      }),
      takeUntil(this.destroy$),
    ).subscribe();
    this.monthControl.valueChanges.pipe(
      tap(value => {
        this.changeMonth.next(formattedFromTextToNumericMonth(value));
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public getMonthsFromDate(date: string | undefined): string {
    if (!date) {
      return '';
    }
    const month: string[] = date.split('/');

    return month[1] + '-' + month[2];
  }
}
