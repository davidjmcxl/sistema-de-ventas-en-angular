import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HomeComponent,
    SellerAuthComponent,
    AllItemsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    HomeComponent
    ,SellerAuthComponent
    ,AllItemsComponent
  ]
})
export class PagesModule { }
