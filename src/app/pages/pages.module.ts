import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { ProvidersComponent } from './providers/providers.component';
import { SalesComponent } from './sales/sales.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewSaleComponent } from './new-sale/new-sale.component';




@NgModule({
  declarations: [
    HomeComponent,
    CustomersComponent,
    ProductsComponent,
    ProvidersComponent,
    SalesComponent,
    SettingsComponent,
    UsersComponent,
    DashboardComponent,
    NewSaleComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,HttpClientModule,
    SharedModule,
    PagesRoutingModule,
    PipesModule,ReactiveFormsModule

      ],

})
export class PagesModule { }
