import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilesMyHrService, LeadingCompaniesService} from "@shared/api/services";
import {AlertsService, DestroyService} from "@shared/services";
import {map, Observable, tap} from "rxjs";
import {ChatIdGetResponse, GetLeadingCompaniesResponse, IdAndNameResponse, LeadCompany} from "@shared/api/models";
import {ProcessTableItems} from "@shared/entities";

@Component({
  selector: 'smarti-company-carousel-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-carousel-layout.component.html',
  styleUrls: ['./company-carousel-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCarouselLayoutComponent implements OnInit {
  @ViewChild('carouselCompanyElement') public carouselCompanyElement!: ElementRef;
  // companies$ : Observable<LeadCompany[]>
  companies$: LeadCompany[] | null = []

  constructor(
    private readonly leadingCompaniesService: LeadingCompaniesService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly alertsService: AlertsService) {
  }

  public ngOnInit(): void {
    this.leadingCompaniesService.apiLeadingCompaniesGetLeadingCompaniesGet().pipe(map(res => {
      this.companies$ = res.items!
    })).subscribe(() => this.changeDetectorRef.detectChanges()
    )
  }

  public carouselMove(direction: 'left' | 'right'): void {
    this.carouselCompanyElement.nativeElement.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -260 : 260,
    });
  }
}
