import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
const base_url=environment.base_url;
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user!:User;
  get token(){
    return localStorage.getItem('token') || '';
  }
  get id(){
    return this.user.idusuario;

  }
  constructor(private http:HttpClient,private router:Router) { }
  login(user:Auth){
    const url=`${base_url}/auth`;
    return this.http.post(url,user).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token);
      }
      ));
  }
  validarToken():Observable<boolean>{
    const url =`${base_url}/auth/renew`
    return this.http.get(url,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{

        const {idusuario ,nombre,correo,usuario,rol,estatus,imagen}=resp.user[0];

        this.user = new User(idusuario,nombre,correo,usuario,rol,estatus,imagen);

        localStorage.setItem('token',resp.token);
        return true
    }),

    catchError(error=>of(false))
    );
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

  }
  settings(id:number,body:any){
    const url=`${base_url}/usuarios/account/${id}`;
    return this.http.put(url,body);
  }
}
