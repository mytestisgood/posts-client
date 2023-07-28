import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderAuthLayoutComponent,
  RegistrationFooterComponent,
} from '@shared/layout';
import { ProgressBarComponent, ProgressBarObject, RegistrationFormComponent } from '@feature';

type Step = 'personalInfo' | 'loginInfo' | 'uploadDocumentInfo' | 'verifyEmailInfo';

@Component({
  selector: 'smarti-registration',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    RegistrationFormComponent,
    RegistrationFooterComponent,
    HeaderAuthLayoutComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements AfterViewInit {
  public changeImageStep: Step  = 'personalInfo';

  public stepCounter: ProgressBarObject = {
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

  public secondStepCounter: ProgressBarObject = {
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

  public thirdStepCounter: ProgressBarObject = {
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

  public fourthStepCounter: ProgressBarObject = {
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

  constructor(private readonly elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
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
