import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { SPECIAL_HEADER_TOKEN, SpecialHeaderTokenEnum } from '@shared/entities';
import { SessionStorageService } from '@shared/web-api';
import { ScrollManagerDirective } from './scroll-manager.directive';

@Directive({
  selector: '[smartiScrollSection]',
  standalone: true,
})
export class ScrollSectionDirective implements AfterViewInit, OnDestroy {
  @Input('smartiScrollSection') public id!: string | number;

  public isSpecialHeaderShow: boolean = this.sessionStorageService
    .getItem(SPECIAL_HEADER_TOKEN) === SpecialHeaderTokenEnum.Show;
  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly manager: ScrollManagerDirective,
    private readonly sessionStorageService: SessionStorageService,
  ) {}

  public ngAfterViewInit(): void {
    this.manager.register(this);
  }

  public ngOnDestroy(): void {
    this.manager.remove(this);
  }

  public scroll(): void {
    let offsetValue: number;

    switch (this.id) {
      case 'blog':
        offsetValue = this.isSpecialHeaderShow
          ? this.host.nativeElement.offsetTop - 120
          : this.host.nativeElement.offsetTop + 70;

        window.scrollTo({ top: offsetValue, behavior: 'smooth' });
        break;
      case 'about':
        offsetValue = this.isSpecialHeaderShow
          ? this.host.nativeElement.offsetTop - 200
          : this.host.nativeElement.offsetTop + 70;

        window.scrollTo({ top: offsetValue, behavior: 'smooth' });
        break;
      case 'banner':
        offsetValue = this.isSpecialHeaderShow
          ? this.host.nativeElement.offsetTop - 200
          : this.host.nativeElement.offsetTop + 70;

        window.scrollTo({ top: offsetValue, behavior: 'smooth' });
        break;
      default:
        this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
