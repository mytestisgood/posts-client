import { ScrollManagerDirective } from './scroll-manager.directive';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[smartiScrollAnchor]',
})
export class ScrollAnchorDirective {
  @Input('smartiScrollAnchor') public id!: string | number;

  @HostListener('click')
  public scroll(): void {
    this.manager.scroll(this.id);
  }

  constructor(private readonly manager: ScrollManagerDirective) {
  }
}
