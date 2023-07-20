import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-contact-us-footer-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us-footer-layout.component.html',
  styleUrls: ['./contact-us-footer-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsFooterLayoutComponent {

}
