
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Input() textMenu:string='';
  @Input() iconText:string='';
  public user!:User;
public role:string='';
  constructor(private authService:AuthService) {}


  ngOnInit(): void {
    this.user=this.authService.user;
    this.tranforRole();
  }
  toggleSidebar() {


    this.toggleSidebarForMe.emit();
  }
  logout(){
    this.authService.logout();
  }
  tranforRole(){
    this.user.rol==1 ? this.role='Administrador' :this.user.rol==2  ? this.role='Supervisor' : this.role='Empleado';
  }

}
