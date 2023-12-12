import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from '@pages';
import {
  TUI_SANITIZER,
  TuiAlertModule, TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiRootModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthHttpInterceptorProvider, AuthHttterceptorProvider} from './auth-interceptor';
import { CommonModule } from '@angular/common';
import { ContinueProcessResolve } from '../shared/resolves/continueProcessData.resolve';
import {TuiDataListWrapperModule, TuiInputModule, TuiSelectModule, TuiSliderModule} from "@taiga-ui/kit";
import {TuiAutoFocusModule} from "@taiga-ui/cdk";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LandingComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSliderModule,
    TuiAutoFocusModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    ContinueProcessResolve,
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    AuthHttpInterceptorProvider
  ],
})
export class AppModule {
}
