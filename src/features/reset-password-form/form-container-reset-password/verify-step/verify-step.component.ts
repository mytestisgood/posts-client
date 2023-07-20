import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, InputNumberComponent, RadioComponent } from '@shared/ui';

type Direction = 'forward' | 'back';
@Component({
  selector: 'smarti-verify-step',
  standalone: true,
  imports: [CommonModule, RadioComponent, ButtonComponent, InputNumberComponent],
  templateUrl: './verify-step.component.html',
  styleUrls: ['./verify-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyStepComponent implements OnInit {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

  public verifyStepForm!: FormGroup;
  public items: { name: string }[] = [{ name: 'email' }, { name: 'phone' }]
  public isModeChosen: boolean = false;
  public isDisabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
    }
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login'])
  }

  public changeButtonStatus(isFilled: boolean): void {
    this.isDisabled = !isFilled;
  }
}
