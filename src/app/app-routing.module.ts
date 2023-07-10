import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../pages/registration/registration.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
