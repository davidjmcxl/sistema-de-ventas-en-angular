import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { ProvidersComponent } from './providers/providers.component';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { RoleAdminGuard } from '../guards/role-admin.guard';
import { RoleSupervisorGuard } from '../guards/role-supervisor.guard';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      {
        path: 'sales',component:SalesComponent
      },
      {
        path: 'providers',component:ProvidersComponent,
        canActivate:[RoleSupervisorGuard],
        canLoad:[RoleSupervisorGuard]

      },
      {
        path: 'customers',component:CustomersComponent
      },
      {
        path: 'users',component:UsersComponent,
        canActivate:[RoleAdminGuard],
        canLoad:[RoleAdminGuard]
      },
      {
        path: 'products',component:ProductsComponent
      },
      {
        path: 'settings',component:SettingsComponent
      },
      {
        path: '**', redirectTo: 'home'}
    ]

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

