import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserElement } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { Provider, ProviderElement } from '../interfaces/provider.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private http: HttpClient) { }
  baseUrl=environment.base_url;
  getProviders(){
    return this.http.get<Provider>(`${this.baseUrl}/proveedores`);
  }

  createProvider(user:ProviderElement){

    return this.http.post<ProviderElement>(`${this.baseUrl}/proveedores`,user);
  }
  deleteProvider(id:number){
    return this.http.delete<Provider>(`${this.baseUrl}/proveedores/${id}`);
  }
  updateProviders(id:number,provider:ProviderElement){

    return this.http.put<ProviderElement>(`${this.baseUrl}/proveedores/${id}`,provider);
  }
  searchProvider(termino:string){
    return this.http.get<Provider>(`${this.baseUrl}/search/proveedores/${termino}`);
  }
}
