import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '@shared/api';
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from '@pages';
import { SharedModule } from '@shared/module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    LandingComponent,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    ApiModule,
    HttpClientModule,
],
  bootstrap: [AppComponent],
        providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
    })
export class AppModule {
}
