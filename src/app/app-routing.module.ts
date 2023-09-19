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
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
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
        path: 'compensations',
        loadComponent: () => import('@shared/layout').then(m => m.DashboardCompensationsComponent),
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
    canActivate: [LoginGuard],
    pathMatch: 'full',
    children: [{ path: '', component: NotFoundComponent }],
  },
];

@NgModule({
  imports: [
    BrowserModule, RouterModule.forRoot(
      routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
