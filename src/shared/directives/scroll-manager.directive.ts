import {Directive} from "@angular/core";
import {ScrollSectionDirective} from "./scroll-section.directive";

@Directive({
  selector: '[appScrollManager]',
})
export class ScrollManagerDirective {
  private sections = new Map<string | number, ScrollSectionDirective>();

  scroll(id: string | number) {
    console.log('scroll')
    this.sections.get(id)!.scroll();
  }

  register(section: ScrollSectionDirective) {
    this.sections.set(section.id, section);
  }

  remove(section: ScrollSectionDirective) {
    this.sections.delete(section.id);
  }
}
