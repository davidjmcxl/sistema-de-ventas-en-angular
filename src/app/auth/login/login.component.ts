import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private authServices:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.loginForm=this.fb.group({
      correo:['test433@gmail.com',[Validators.required,Validators.email]],
      clave:['',Validators.required]
    })
  }
  login(){
    this.authServices.login(this.loginForm.value).subscribe((resp:any)=>{
      this.router.navigateByUrl('/dashboard');
    },(err)=>{
      const errEmail=this.loginForm.get('correo')?.value;
      const errPass=this.loginForm.get('clave')?.value;
      console.log(errPass);

      if(errEmail==''||errPass==''){
        Swal.fire('Error','los Campos son obligatorios','error');

      }else if(errPass.length<6){
        Swal.fire('Error','La contraseña no es valida','error');

      }
      else{
        Swal.fire('Error',err.error.msg,'error');
      }

    })

  }

}
