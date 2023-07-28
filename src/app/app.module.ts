import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from '@pages';
import { ApiModule } from '@shared/api';
import { SharedModule } from '@shared/module';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppModule {
}
