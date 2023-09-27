import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Src } from '@shared/api/models';
import { LeadService } from '@shared/api/services';
import { emailValidatorPattern, LeadsForm } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-leads-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './leads-dialog.component.html',
  styleUrls: ['./leads-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsDialogComponent {
  @Input() public observer!: { complete: () => void };
  @Input() public haveCloseIcon: boolean = false;
  @Input() public headerFormText!: string;
  @Input() public descriptionFormText!: string;
  @Input() public headerText!: string;
  @Input() public descriptionText!: string;
  @Input() public backgroundImage!: string;
  @Input() public leadType!: Src;
  @Input() public friendName!: string;
  @Input() public friendEmail!: string;

  public leadsForm: FormGroup<LeadsForm> = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly leadService: LeadService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(): void {
    this.leadService.apiLeadsCreateLeadPost({
      email: this.leadsForm.controls.email.value as string,
      name: this.leadsForm.controls.name.value as string,
      phone: this.leadsForm.controls.phone.value as string,
      src: this.leadType,
      friend_name: this.friendName,
      friend_email: this.friendEmail,
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.observer.complete());
  }
}
