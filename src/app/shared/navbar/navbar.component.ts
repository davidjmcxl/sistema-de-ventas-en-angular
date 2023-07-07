import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private menuService:MenuService,private authService:AuthService) { }
  public menu:any[]=[];
  public user!:User;
  ngOnInit(): void {
    this.user=this.authService.user;
    console.log(this.user.rol);

    this.menu=this.menuService.getMenu(this.user.rol);
    console.log(this.menu);
  }





}
