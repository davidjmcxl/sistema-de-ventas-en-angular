import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private authService:AuthService,private fb:FormBuilder
    ) { }
  public user!:User;
  public formSettings!:FormGroup;
  public role:string='';
  ngOnInit(): void {
    this.user=this.authService.user;
    this.tranforRole();
    this.formSettings=this.fb.group({
      nombre:[this.user.nombre,Validators.required],
      correo:[this.user.correo,Validators.required],



    })
  }
  tranforRole(){
    this.user.rol==1 ? this.role='Administrador' :this.user.rol==2  ? this.role='Supervisor' : this.role='Empleado';
  }
  actualizar(){
    console.log(this.formSettings.value);
    this.authService.settings(this.user.idusuario,this.formSettings.value).subscribe((resp:any)=>{
      Swal.fire('Success',resp.msg,'success')
    }
    )
  }
}
