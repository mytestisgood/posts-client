import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegistrationFooterComponent
} from '../../shared/layout/registration-layout/registration-footer/registration-footer.component';
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
    RegistrationFooterComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements AfterViewInit {
  public changeImage = false;
  public newCounter: {} = {
    one: 'fill',
    two: 'fill',
    three: 'fill',
    four: 'fill',
    five: 'fill',
    six: 'none',
    seven: 'none',
    eight: 'none',
    nine: 'none',
    ten: 'none',
  };

  public standardCounter = {
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

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F7F9FC';
  }

  public doChangingImage($event: boolean): void {
    console.log($event, 'changingStep');
    if ($event) {
      this.changeImage = true;
    }
  }
}
