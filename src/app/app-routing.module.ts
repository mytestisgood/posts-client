import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  ContactComponent,
  DashboardComponent,
  LandingComponent,
  LoginComponent,
  NotFoundComponent,
  RegistrationComponent,
  ResetPasswordComponent,
} from '@pages';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: LandingComponent,
    pathMatch: 'full',
    children: [{ path: '', component: NotFoundComponent }],
  },
];

@NgModule({
  imports: [
    BrowserModule, RouterModule.forRoot(
      routes, { scrollPositionRestoration: 'enabled' },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
