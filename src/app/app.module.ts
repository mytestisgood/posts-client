import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from "../pages/landing/landing.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingComponent,
    SharedModule,
    ReactiveFormsModule,
  ],

  providers: [ {provide: LocationStrategy, useClass: PathLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
