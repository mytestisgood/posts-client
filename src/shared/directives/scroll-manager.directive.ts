import {Directive} from "@angular/core";
import {ScrollSectionDirective} from "./scroll-section.directive";

@Directive({
  selector: '[appScrollManager]',
})
export class ScrollManagerDirective {
  private sections = new Map<string | number, ScrollSectionDirective>();

  public scroll(id: string | number): void {
    this.sections.get(id)!.scroll();
  }

  public register(section: ScrollSectionDirective): void {
    this.sections.set(section.id, section);
  }

  public remove(section: ScrollSectionDirective): void {
    this.sections.delete(section.id);
  }
}
