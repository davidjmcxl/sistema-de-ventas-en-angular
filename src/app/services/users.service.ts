import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User, UserElement } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  baseUrl=environment.base_url;
 
  getUsers(){
    return this.http.get<User>(`${this.baseUrl}/usuarios`);
  }

  createUser(user:UserElement){

    return this.http.post<UserElement>(`${this.baseUrl}/usuarios`,user);
  }
  deleteUser(id:number){
    return this.http.delete<User>(`${this.baseUrl}/usuarios/${id}`);
  }
  updateUser(id:number,user:UserElement){

    return this.http.put<UserElement>(`${this.baseUrl}/usuarios/${id}`,user);
  }
  searchUser(termino:string){
    return this.http.get<User>(`${this.baseUrl}/search/usuarios/${termino}`);
  }
}
