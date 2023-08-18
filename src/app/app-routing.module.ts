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
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardHomeComponent),
      },
      {
        path: 'processes',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardProcessesComponent),
      },
      {
        path: 'processes/:id',
        loadComponent: () => import('@shared/layout').then(m => m.ProcessesDetailComponent),
      },
      {
        path: 'employer',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardEmployerComponent),
      },
      {
        path: 'balance',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardBalanceComponent),
      },
      {
        path: 'documents',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardDocumentsComponent),
      },
      {
        path: 'cash-register',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardCashRegisterComponent),
      },
      {
        path: 'inquiries',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardInquiriesComponent),
      },
      {
        path: 'shield',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardShieldComponent),
      },
      {
        path: 'download-documents',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardDownloadDocumentsComponent),
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
