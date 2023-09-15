import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LeadService } from '@shared/api';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-questions-banner-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputFieldComponent],
  templateUrl: './questions-banner-layout.component.html',
  styleUrls: ['./questions-banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsBannerLayoutComponent {
  public phone: FormControl<string | null> = new FormControl('');
  public name: FormControl<string | null> = new FormControl('');
  public email: FormControl<string | null> = new FormControl('');
  constructor(
    private readonly leadService: LeadService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public sendCreateLeadRequest(): void {
    this.leadService.apiLeadsCreateLeadPost({
      name: this.name.value as string,
      phone: this.phone.value as string,
      email: this.email.value as string,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
