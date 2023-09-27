import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadService } from '@shared/api/services';
import { ScrollManagerDirective } from '@shared/directives';
import { emailValidatorPattern, LeadsForm } from '@shared/entities';
import { FooterComponent, HeaderComponent } from '@shared/layout';
import { DestroyService } from '@shared/services';
import { ButtonComponent, ExpandComponent, InputFieldComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-contact',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    ExpandComponent,
    InputFieldComponent,
    ScrollManagerDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements AfterViewInit {
  public isExpanded: boolean = false;
  public leadsForm: FormGroup<LeadsForm> = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly elementRef: ElementRef,
    private readonly destroy$: DestroyService,
    private readonly leadService: LeadService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }
  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F7F9FC';
  }

  public toggleExpandedContent(): void {
    this.isExpanded = !this.isExpanded;
  }

  public sendContactRequest(): void {
    this.leadService.apiLeadsCreateLeadPost({
      email: this.leadsForm.controls.email.value as string,
      phone: this.leadsForm.controls.phone.value as string,
      name: this.leadsForm.controls.name.value as string,
    }).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isExpanded = !this.isExpanded;
      this.changeDetectorRef.detectChanges();
    });
  }
}
