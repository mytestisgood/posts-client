import {NgModule} from "@angular/core";
import {ScrollAnchorDirective} from "./directives/scroll-anchor.directive";
import {ScrollSectionDirective} from "./directives/scroll-section.directive";
import {ScrollManagerDirective} from "./directives/scroll-manager.directive";

@NgModule({
  declarations: [ScrollAnchorDirective, ScrollSectionDirective, ScrollManagerDirective],
  exports: [ScrollAnchorDirective, ScrollSectionDirective, ScrollManagerDirective]
})

export class SharedModule {
}
