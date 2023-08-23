import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Customer, CustomerElement } from '../interfaces/customer.interface';
import { Sale } from '../interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }
  baseUrl=environment.base_url;
  getVentas(){
    return this.http.get<Sale>(`${this.baseUrl}/ventas`);
  }
  getProuctTemp(){
    return this.http.get<any>(`${this.baseUrl}/ventas/productsTemp`);
  }
  addProductTemp(product:any){

    return this.http.post<any>(`${this.baseUrl}/ventas/addProduct`,product);
  }
  deleteProductTemp(id:number){

    return this.http.delete<any>(`${this.baseUrl}/ventas/deleteProduct/${id}`,);
  }
  updateCustomer(id:number,customer:CustomerElement){

    return this.http.put<CustomerElement>(`${this.baseUrl}/ventas/${id}`,customer);
  }
  proccessSales(body:any){
    console.log(body);

    return this.http.post<any>(`${this.baseUrl}/ventas/proccess`,body);
  }
  anularSales(){


    return this.http.delete<any>(`${this.baseUrl}/ventas/anular`);
  }
  searchSales(termino:string){
    return this.http.get<Sale>(`${this.baseUrl}/search/ventas/${termino}`);
  }
}
