import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {
  registrationConfirmPaymentLink,
  registrationInfoLink,
  registrationPaymentInstructionLink,
  registrationSetPasswordLink,
  registrationTransferMoneyLink,
  registrationUploadFileLink,
  registrationVerifyCodeLink,
} from '@shared/entities';

export interface ProgressBarObject {
  one?: 'fill' | 'none';
  two?: 'fill' | 'none';
  three?: 'fill' | 'none';
  four?: 'fill' | 'none';
  five?: 'fill' | 'none';
  six?: 'fill' | 'none';
  seven?: 'fill' | 'none';
  eight?: 'fill' | 'none';
  nine?: 'fill' | 'none';
  ten?: 'fill' | 'none';
}

@Component({
  selector: 'smarti-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements AfterViewInit {
  @Input() public currentUrl!: string;
  public counter!: ProgressBarObject;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    this.counter = {
      one: 'none',
      two: 'none',
      three: 'none',
      four: 'none',
      five: 'none',
      six: 'none',
      seven: 'none',
      eight: 'none',
      nine: 'none',
      ten: 'none',
    };
  }

  public ngAfterViewInit(): void {
    switch (this.currentUrl) {
      case registrationInfoLink:
        this.updateCounter(2);
        break;
      case registrationSetPasswordLink:
        this.updateCounter(4);
        break;
      case registrationUploadFileLink:
        this.updateCounter(6);
        break;
      case registrationTransferMoneyLink:
        this.updateCounter(8);
        break;
      case registrationPaymentInstructionLink:
        this.updateCounter(8);
        break;
      case registrationConfirmPaymentLink:
        this.updateCounter(9);
        break;
      case registrationVerifyCodeLink:
        this.updateCounter(10);
        break;
    }
  }

  public updateCounter(
    currentCount: number,
  ): void {
    this.counter.one = currentCount >= 1 ? 'fill' : 'none';
    this.counter.two = currentCount >= 2 ? 'fill' : 'none';
    this.counter.three = currentCount >= 3 ? 'fill' : 'none';
    this.counter.four = currentCount >= 4 ? 'fill' : 'none';
    this.counter.five = currentCount >= 5 ? 'fill' : 'none';
    this.counter.six = currentCount >= 6 ? 'fill' : 'none';
    this.counter.seven = currentCount >= 7 ? 'fill' : 'none';
    this.counter.eight = currentCount >= 8 ? 'fill' : 'none';
    this.counter.nine = currentCount >= 9 ? 'fill' : 'none';
    this.counter.ten = currentCount >= 10 ? 'fill' : 'none';
    this.changeDetectorRef.detectChanges();
  }
}
