import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-table-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent implements OnInit {
  @Input() public total!: number;
  @Input() public items!: number;

  public page: number = 0;

  public minValue: number = 0;
  public maxValue!: number;
  public isFirstPage: boolean = true;
  public isLastPage: boolean = false;

  public ngOnInit(): void {
    this.maxValue = this.total > this.items ? this.items : this.total;
  }

  public onPrevPage(): void {
    if (this.isFirstPage || this.minValue <= 0) {
      return;
    }
    this.isLastPage = false;
    this.page -= 1;
    this.minValue -= this.items;
    this.maxValue -= this.items;

    if (this.minValue <= 0) {
      this.isFirstPage = true;
    }
  }

  public onNextPage(): void {
    if (this.isLastPage || this.maxValue >= this.total) {
      return;
    }

    this.isFirstPage = false;
    this.page -= 1;
    this.minValue += this.items;
    this.maxValue += this.items;

    if (this.maxValue >= this.total) {
      this.isLastPage = true;
    }
  }
}
