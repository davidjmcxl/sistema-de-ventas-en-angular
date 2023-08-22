import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
let menu:any[]=[
  {
    title:'Home',
    icon:'home',
    path:''
  },


  {
    title:'Customers',
    icon:'people',
    path:'customers'
  },
  {
    title:'Providers',
    icon:'local_shipping',
    path:'providers'
  },
  {
    title:'Users',
    icon:'group',
    path:'users'
  },
  {
    title:'Products',
    icon:'shopping_cart',
    path:'products'
  },
  {
    title:'Sales',
    icon:'arrow_drop_down',
    path:'sales',
    opt1:
      {
        title:'New Sale',
        icon:'add_shopping_cart',
        path:'newSale'
      },
      opt2: {
        title:'List Sales',
        icon:'leaderboard',
        path:'sales'
      }


  },
];
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuRol2:any=[];
  public menuRol3:any=[];
  constructor() { }
  getMenu(role:number){
    console.log(role);

    if(role===3){

        this.menuRol3=menu.filter((item)=>item.title!=='Users'&&item.title!=='Providers');
        return this.menuRol3;

    }
    if(role===2){
      this.menuRol2=menu.filter((item)=>item.title!=='Users');
      return this.menuRol2;
    }
    return  menu;

}

}
