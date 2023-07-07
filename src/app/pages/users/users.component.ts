import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { User, UserElement } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['idusuario','nombre','correo','usuario','rol','acciones'];
  data!:UserElement[];
  dataSource = new MatTableDataSource<UserElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.userService.getUsers().subscribe(({users})=>{
     this.data=users;
     this.dataSource = new MatTableDataSource<UserElement>(this.data);
      console.log(this.data);
      this.dataSource.paginator = this.paginator;

    })
  }
  ngAfterViewInit() {}


  constructor(private userService:UsersService) { }


}

