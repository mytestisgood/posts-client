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
import {
  DashboardBalanceComponent,
  DashboardCashRegisterComponent,
  DashboardDocumentsComponent,
  DashboardDownloadDocumentsComponent, DashboardEmployerComponent,
  DashboardHomeComponent,
  DashboardInquiriesComponent,
  DashboardProcessesComponent,
  DashboardShieldComponent,
} from '@shared/layout';

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
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: DashboardHomeComponent,
      },
      {
        path: 'processes',
        component: DashboardProcessesComponent,
      },
      {
        path: 'employer',
        component: DashboardEmployerComponent,
      },
      {
        path: 'balance',
        component: DashboardBalanceComponent,
      },
      {
        path: 'documents',
        component: DashboardDocumentsComponent,
      },
      {
        path: 'cash-register',
        component: DashboardCashRegisterComponent,
      },
      {
        path: 'inquiries',
        component: DashboardInquiriesComponent,
      },
      {
        path: 'shield',
        component: DashboardShieldComponent,
      },
      {
        path: 'download-documents',
        component: DashboardDownloadDocumentsComponent,
      },
    ],
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
