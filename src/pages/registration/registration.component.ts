import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegistrationHeaderComponent,
} from '../../shared/layout/registration-layout/registration-header/registration-header.component';
import { ProgressBarComponent } from '../../features/progress-bar/progress-bar.component';
import {
  RegistrationFormComponent,
} from '../../features/registration-form/registration-form.component';

@Component({
  selector: 'smarti-registration',
  standalone: true,
  imports: [
    CommonModule,
    RegistrationHeaderComponent,
    ProgressBarComponent,
    RegistrationFormComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements AfterViewInit {
  public changeImage = false;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F7F9FC';
  }

  public doChangingImage($event: boolean): void {
    console.log($event, 'changingStep');
    if ($event) {
      this.changeImage = true
    }
  }
}
