import {ScrollManagerDirective} from './scroll-manager.directive';
import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";

@Directive({
  selector: '[appScrollSection]',
})
export class ScrollSectionDirective implements OnInit, OnDestroy {
  @Input('appScrollSection') id!: string | number;

  constructor(
    private host: ElementRef<HTMLElement>,
    private manager: ScrollManagerDirective
  ) {
  }

  public ngOnInit(): void {
    this.manager.register(this);
  }

  public ngOnDestroy(): void {
    this.manager.remove(this);
  }

  public scroll(): void {
    this.host.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
