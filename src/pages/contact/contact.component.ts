import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { ScrollManagerDirective } from '@shared/directives';
import { FooterComponent, HeaderComponent } from '@shared/layout';
import { ButtonComponent, ExpandComponent, InputFieldComponent } from '@shared/ui';

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
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements AfterViewInit {
  public isExpanded: boolean = false;

  constructor(private readonly elementRef: ElementRef) {
  }
  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F7F9FC';
  }

  public toggleExpandedContent(): void {
    this.isExpanded = !this.isExpanded;
  }

  public sendContactRequest(): void {
    this.isExpanded = !this.isExpanded;
  }
}
