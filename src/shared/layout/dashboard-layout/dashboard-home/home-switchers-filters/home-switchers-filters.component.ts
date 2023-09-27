import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownService } from '@shared/services';
import {
  ButtonComponent,
  CustomDropdownComponent,
  DatePickerComponent,
  RadioLabeledComponent,
  SelectComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-home-switchers-filters',
  standalone: true,
  imports: [
    CommonModule, RadioLabeledComponent, ReactiveFormsModule, CustomDropdownComponent,
    DatePickerComponent, ButtonComponent, SelectComponent,
  ],
  templateUrl: './home-switchers-filters.component.html',
  styleUrls: ['./home-switchers-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSwitchersFiltersComponent {
  public dates: string = 'Dates';
  public salaryMonth: string = 'SalaryMonth';
  public datesControl: FormControl<string | null> = new FormControl(null);
  public salaryMonthControl: FormControl<string | null> = new FormControl(null);
  public isDatesMode: boolean = false;
  public isSalaryMonthMode: boolean = false;
  public isDatesDropdownOpen: boolean = false;
  public isSalaryMonthDropdownOpen: boolean = false;

  constructor(@Optional() private readonly dropdownService?: DropdownService) {
  }

  public openDatesChangeDropdown(active?: boolean): void {
    this.isDatesMode = !this.isDatesMode;
    this.isSalaryMonthMode = false;
    this.salaryMonthControl.setValue(null);
    this.datesControl.setValue(this.isDatesMode ? this.dates : null);
    this.activeElementClose(active as boolean);
  }

  public openSalaryMonthChangeDropdown(active?: boolean): void {
    this.isSalaryMonthMode = !this.isSalaryMonthMode;
    this.isDatesMode = false;
    this.datesControl.setValue(null);
    this.salaryMonthControl.setValue(this.isSalaryMonthMode ? this.salaryMonth : null);
    this.activeElementClose(active as boolean);
  }

  public activeElementClose(active: boolean): void {
    if (active) {
      this.dropdownService?.setState(false);
    }
  }

  public isActiveZoneSalaryMonthChanged(activeZone: boolean): void {
    if (!activeZone) {
      this.isSalaryMonthMode = false;
      this.salaryMonthControl.setValue(null);
    }
  }

  public isActiveZoneDatesChanged(activeZone: boolean): void {
    if (!activeZone) {
      this.isDatesMode = false;
      this.datesControl.setValue(null);
    }
  }
}
