import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGarde } from './AuthGarde';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Admin/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'passwordreset',
    loadChildren: () => import('./userManagement/passwordreset/passwordreset.module').then(m => m.PasswordresetModule)
  },
  {
    path: 'Changepassword',
    loadChildren: () => import('./userManagement/change-password/change-password.module').then(m => m.ChangePasswordModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./userManagement/verification/verification.module').then(m => m.VerificationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Admin/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { title: 'Dashboard', breadCrum: 'Home' },
    canLoad: [AuthGarde]
  },
  {
    // 404
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
