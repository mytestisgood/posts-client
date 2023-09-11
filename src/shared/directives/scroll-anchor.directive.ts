import { Directive, HostListener, Input } from '@angular/core';
import { ScrollManagerDirective } from './scroll-manager.directive';

@Directive({
  selector: '[smartiScrollAnchor]',
  standalone: true,
})
export class ScrollAnchorDirective {
  @Input('smartiScrollAnchor') public id!: string | number;

  @HostListener('click')
  public scroll(): void {
    this.manager.scroll(this.id);
  }

  constructor(private readonly manager: ScrollManagerDirective) {}
}
