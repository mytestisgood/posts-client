import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {itemsReducer} from "../shared/entities/pots.models";
import {ListComponent} from "../pages/list/list.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    ListComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({items: itemsReducer}),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
  ]
})
export class AppModule {
}
