import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

interface ProgressBarObject {
  one: 'fill' | 'none';
  two: 'fill' | 'none';
  three: 'fill' | 'none';
  four: 'fill' | 'none';
  five: 'fill' | 'none';
  six: 'fill' | 'none';
  seven: 'fill' | 'none';
  eight: 'fill' | 'none';
  nine: 'fill' | 'none';
  ten: 'fill' | 'none';
}

@Component({
  selector: 'smarti-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnInit {
  @Input() counter: ProgressBarObject = {
    one: 'fill',
    two: 'fill',
    three: 'none',
    four: 'none',
    five: 'none',
    six: 'none',
    seven: 'none',
    eight: 'none',
    nine: 'none',
    ten: 'none',
  };

  public progressObj: ProgressBarObject = {
    one: 'fill',
    two: 'none',
    three: 'none',
    four: 'none',
    five: 'none',
    six: 'none',
    seven: 'none',
    eight: 'none',
    nine: 'none',
    ten: 'none',
  }

  ngOnInit() {
    this.progressObj = this.counter;
  }
}