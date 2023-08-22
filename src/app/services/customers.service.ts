import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ProviderElement } from '../interfaces/provider.interface';
import { Customer, CustomerElement } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }
  baseUrl=environment.base_url;
  getCustomers(){
    return this.http.get<Customer>(`${this.baseUrl}/clientes`);
  }

  createCustomer(customer:CustomerElement){

    return this.http.post<CustomerElement>(`${this.baseUrl}/clientes`,customer);
  }
  deleteCustomer(id:number){
    return this.http.delete<Customer>(`${this.baseUrl}/clientes/${id}`);
  }
  updateCustomer(id:number,customer:CustomerElement){

    return this.http.put<CustomerElement>(`${this.baseUrl}/clientes/${id}`,customer);
  }
  searchCustomer(termino:string){
    return this.http.get<Customer>(`${this.baseUrl}/search/clientes/${termino}`);
  }
}
