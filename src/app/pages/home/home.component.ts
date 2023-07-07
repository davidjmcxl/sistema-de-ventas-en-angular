import { ServicesService } from './../../services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service:ServicesService) { }
  data:any
  public sideBarOpen:boolean=true;
  public textMenu:string='';
  public iconText:string='close'
  ngOnInit(): void {

  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    if(this.sideBarOpen==false){
      this.textMenu='Menu';
      this.iconText='menu';
    }else{
      this.textMenu='';
      this.iconText='close';
    }
  }
}
