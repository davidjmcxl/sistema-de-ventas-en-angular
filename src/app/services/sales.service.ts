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

  createCustomer(customer:CustomerElement){

    return this.http.post<CustomerElement>(`${this.baseUrl}/clientes`,customer);
  }
  deleteCustomer(id:number){
    return this.http.delete<Customer>(`${this.baseUrl}/clientes/${id}`);
  }
  updateCustomer(id:number,customer:CustomerElement){

    return this.http.put<CustomerElement>(`${this.baseUrl}/ventas/${id}`,customer);
  }
  searchSales(termino:string){
    return this.http.get<Sale>(`${this.baseUrl}/search/ventas/${termino}`);
  }
}
