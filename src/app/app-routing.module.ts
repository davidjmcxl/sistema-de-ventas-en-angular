

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
  ,{
    path: 'dashboard',
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),


  }
  ,{
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
