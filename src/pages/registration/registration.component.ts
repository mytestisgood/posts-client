import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegistrationFooterComponent, RegistrationHeaderComponent
} from '@shared/layout';
import { ProgressBarComponent, RegistrationFormComponent } from '@feature';

type Step = 'personalInfo' | 'loginInfo' | 'uploadDocumentInfo' | 'verifyEmailInfo';

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
  public changeImageStep: Step  = 'personalInfo';

  public stepCounter: {} = {
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

  public secondStepCounter: {} = {
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

  public thirdStepCounter: {} = {
    one: 'fill',
    two: 'fill',
    three: 'fill',
    four: 'fill',
    five: 'fill',
    six: 'fill',
    seven: 'fill',
    eight: 'fill',
    nine: 'none',
    ten: 'none',
  };

  public fourthStepCounter: {} = {
    one: 'fill',
    two: 'fill',
    three: 'fill',
    four: 'fill',
    five: 'fill',
    six: 'fill',
    seven: 'fill',
    eight: 'fill',
    nine: 'fill',
    ten: 'fill',
  };

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F7F9FC';
  }

  public doChangingImage(changingStep: string): void {
    switch (changingStep) {
      case 'personalInfo':
        this.changeImageStep = changingStep;
        break;
      case 'loginInfo':
        this.stepCounter = this.secondStepCounter;
        this.changeImageStep = changingStep;
      break;
      case 'uploadDocumentInfo':
        this.stepCounter = this.thirdStepCounter;
        this.changeImageStep = changingStep;
      break;
      case 'verifyEmailInfo':
        this.stepCounter = this.fourthStepCounter;
        this.changeImageStep = changingStep;
    }
  }
}
