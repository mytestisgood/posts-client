import { NgModule } from '@angular/core';
import {
  ScrollAnchorDirective,
  ScrollSectionDirective,
  ScrollManagerDirective,
} from '@shared/directives';

@NgModule({
  declarations: [ScrollAnchorDirective, ScrollSectionDirective, ScrollManagerDirective],
  exports: [ScrollAnchorDirective, ScrollSectionDirective, ScrollManagerDirective],
})

export class SharedModule {
}
