import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
  public imagenSubir!:File;
  public imgTemp:string="";
  private fileUpload= inject (FileUploadService)
  ngOnInit(): void {
    this.user=this.authService.user;
    console.log(this.user);

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
  cambiarImg(event:any){
    this.imagenSubir=event.target.files[0];
    console.log(this.imagenSubir);



    if(!event.target.files[0]){

       this.imgTemp=""}

    const reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () =>{
      this.imgTemp=reader.result as string;




    }



  }
  subirImagen(){
    console.log(this.user.idusuario);


   this.fileUpload.actualizarFoto(this.imagenSubir,'users',this.user.idusuario ).then(
      (img:any)=>{
        this.user.imagen=img;
        Swal.fire('Success','Imagen Actualizada correctamente','success');

      }
    ).catch((err:any)=>{
      console.log(err);

    }
    )
  }
}
