import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@environment';
import { NgxsModule } from '@ngxs/store';
import { LandingComponent } from '@pages';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptorProvider } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    LandingComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    AuthHttpInterceptorProvider,
  ],
})
export class AppModule {
}
