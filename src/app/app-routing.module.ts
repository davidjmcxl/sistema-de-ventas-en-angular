import { AllItemsComponent } from './pages/all-items/all-items.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',component:HomeComponent
  },{
    path:'seller',component:SellerAuthComponent
  },
  {
    path:'all-items',component:AllItemsComponent
  },
  {
    path:'**',redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
