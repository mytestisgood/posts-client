import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, InputNumberComponent, RadioBlockComponent } from '@shared/ui';
import {isMobile} from '@shared/helpers';


type Direction = 'forward' | 'back';
@Component({
  selector: 'smarti-verify-step',
  standalone: true,
  imports: [CommonModule, RadioBlockComponent, ButtonComponent, InputNumberComponent],
  templateUrl: './verify-step.component.html',
  styleUrls: ['./verify-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyStepComponent implements OnInit {
  public isMobile = isMobile
  public customWidth = this.isMobile? '320px': '536px'
  public customButtonWidth = this.isMobile? '250px': '431px'

  @Input() public startingForm!: FormGroup;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
  public verifyStepForm!: FormGroup;
  public items: { name: string }[] = [{ name: 'email' }, { name: 'phone' }];
  public radioValue: FormControl<{ name: string } | null> = new FormControl({name: 'phone'});
  public isModeChosen: boolean = false;
  public isDisabled: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.verifyStepForm = this.formBuilder.group({});
  }

  public doChangeStep(direction: 'forward'): void {
    this.changeStep.emit(direction);
  }

  public doChangeContent(mode: string): void {
    if (mode === 'email' || mode === 'phone') {
      this.isModeChosen = true;
      if(mode==='email'){

      }
    }
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  public changeButtonStatus(isFilled: boolean): void {
    this.isDisabled = !isFilled;
  }
}
