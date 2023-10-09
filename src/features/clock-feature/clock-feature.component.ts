import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { getLastDayOfMonths } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { LoaderComponent } from '@shared/ui';
import { delay, map, Observable, of, takeUntil } from 'rxjs';

interface Timer {
  sec: string;
  min: string;
  hrs: string;
  days: string;
}

@Component({
  selector: 'smarti-clock-feature',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './clock-feature.component.html',
  styleUrls: ['./clock-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockFeatureComponent implements OnInit, OnDestroy {
  public timerInterval!: number;
  public timer: Timer = { sec: '00', min: '00', hrs: '00', days: '00' };
  public isLoaded: boolean = false;
  public timerLoading$: Observable<boolean> = of(true).pipe(
    delay(1000),
    map(value => (this.isLoaded = value)),
    takeUntil(this.destroy$),
  );

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    this.timerLoading$.subscribe();
    this.startTimer();
  }

  public ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
  public startTimer(): void {
    const countDownDate: number = getLastDayOfMonths().getTime();
    const date: Date = new Date();
    const currentDate: number = date.getTime();
    let timeLeft: number = new Date().setTime(countDownDate - currentDate);

    this.timerInterval = window.setInterval(() => {
      timeLeft = (!timeLeft ? 86400000 : timeLeft - 1000);
      this.timer.sec =  (Math.floor((timeLeft % (1000 * 60)) / 1000)).toString().padStart(2, '0');
      this.timer.min = (Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
      this.timer.hrs = (Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0');
      this.timer.days = (Math.floor(timeLeft / (1000 * 60 * 60 * 24))).toString().padStart(2, '0');
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }
}
