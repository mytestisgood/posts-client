import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import {
  DashboardMenuComponent,
  DashboardHeaderComponent,
  DashboardMainComponent,
  DashboardNotificationComponent,
} from '@shared/layout';

@Component({
  selector: 'smarti-dashboard',
  standalone: true,
  imports: [
    CommonModule, DashboardHeaderComponent, DashboardNotificationComponent,
    DashboardMainComponent, DashboardMenuComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F7F9FC';
  }
}
