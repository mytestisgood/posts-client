import { ScrollManagerDirective } from './scroll-manager.directive';
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[smartiScrollSection]',
})
export class ScrollSectionDirective implements OnInit, OnDestroy {
  @Input('smartiScrollSection') public id!: string | number;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly manager: ScrollManagerDirective,
  ) {
  }

  public ngOnInit(): void {
    this.manager.register(this);
  }

  public ngOnDestroy(): void {
    this.manager.remove(this);
  }

  public scroll(): void {
    this.host.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
