import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'smarti-company-carousel-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-carousel-layout.component.html',
  styleUrls: ['./company-carousel-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCarouselLayoutComponent {
  @ViewChild('carouselCompanyElement') public carouselCompanyElement!: ElementRef;

  public carouselMove(direction: 'left' | 'right'): void {
    this.carouselCompanyElement.nativeElement.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -260 : 260,
    });
  }
}
