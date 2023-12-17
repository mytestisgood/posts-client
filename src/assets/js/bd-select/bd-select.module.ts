import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BdSelectComponent } from './bd-select.component';
// import { MatIconModule } from '@angular/material/icon';
// import { BdOptionComponent } from 'assets/js/bd-select/bd-option/bd-option.component';

@NgModule({
	imports: [CommonModule, FormsModule],
	exports: [BdSelectComponent],
	declarations: [BdSelectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // imports: [CommonModule, FormsModule, MatIconModule],
  // exports: [BdSelectComponent, BdOptionComponent],
  // declarations: [BdSelectComponent, BdOptionComponent]
})
export class BdSelectModule {}
