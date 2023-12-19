import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormControlStatus, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ButtonComponent, InputFieldComponent, InputNumberComponent, RadioBlockComponent} from "@shared/ui";
import {Observable, takeUntil, tap} from "rxjs";
import {DestroyService} from "@shared/services";
import {emailValidatorPattern, israelMobilePhoneValidatorPattern} from "@shared/entities";
import {SignInService} from "@shared/api/services";
import {isMobile} from '@shared/helpers';


type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-choose-verify-type',
  standalone: true,
  imports: [CommonModule, RadioBlockComponent, ButtonComponent, InputNumberComponent, InputFieldComponent],
  templateUrl: './choose-verify-type.component.html',
  styleUrls: ['./choose-verify-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseVerifyTypeComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  public isMobile = isMobile
  public customWidth = this.isMobile? '320px': '536px'
  public customButtonWidth = this.isMobile? '250px': '431px'
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
  public verifyStepForm!: FormGroup;
  public items: { name: string }[] = [{name: 'email'}, {name: 'phone'}];
  public radioValue: FormControl<{ name: string } | null> = new FormControl({name: 'phone'});
  public emailOrPhone: FormControl<string | null> = new FormControl('', [Validators.required]);
  public isModeChosen: boolean = false;
  public isDisabled: boolean = true;
  public emailOrPhoneChange$: Observable<FormControlStatus> = this.emailOrPhone.statusChanges.pipe(
    takeUntil(this.destroy$),
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,
  ) {
  }

  public ngOnInit(): void {
    this.verifyStepForm = this.formBuilder.group({});
    this.emailOrPhoneChange$.subscribe(status => {
      this.isDisabled = !(status === 'VALID');
    });
  }

  public doChangeStep(direction: 'forward'): void {
    let value = {}
    if(this.radioValue.value?.name=='phone'){
      value = {'phone': this.emailOrPhone.value}
    }
    else {value = {'email': this.emailOrPhone.value}}
    this.signInService.apiForgotPasswordGet(value).pipe(tap(res =>{
      if(res.message=='true'){
        this.changeStep.emit(direction);
      }
    })).subscribe()
  }

  public doChangeContent(mode: string): void {
    if (mode === 'email' || mode === 'phone') {
      this.isModeChosen = true;
      if (mode === 'email') {
        this.emailOrPhone.setValidators([Validators.required, Validators.pattern(emailValidatorPattern)])
      } else {
        this.emailOrPhone.setValidators([Validators.required, Validators.pattern(israelMobilePhoneValidatorPattern)])
      }
      this.emailOrPhone.setValue(null);
      this.emailOrPhone.updateValueAndValidity()
    }
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  public changeButtonStatus(isFilled: boolean): void {
    this.isDisabled = !isFilled;
  }

}
