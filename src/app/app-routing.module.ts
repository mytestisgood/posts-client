import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, LandingComponent, RegistrationComponent, NotFoundComponent } from '@pages';
import { BrowserModule } from '@angular/platform-browser';
import { ResetPasswordComponent } from '@pages';

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
    path: '**',
    component: LandingComponent,
    pathMatch: 'full',
    children: [{ path: '', component: NotFoundComponent }],
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(
    routes, { scrollPositionRestoration: 'enabled' }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
