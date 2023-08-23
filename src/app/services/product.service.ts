import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ProviderElement } from '../interfaces/provider.interface';
import { Product, ProductElement } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  baseUrl=environment.base_url;
  getProducts(){
    return this.http.get<Product>(`${this.baseUrl}/productos`);
  }

  async createProduct(product:any,imagen:File){

    try {
      const url = `${this.baseUrl}/productos`
      const formData = new FormData();
      formData.append('imagen',imagen);
      formData.append('data', JSON.stringify(product  ))

      const resp = await fetch(url,{
        method:'POST',

        body:formData
      });
      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }

    } catch (error) {
    return false
  }



    /* return this.http.post<ProductElement>(`${this.baseUrl}/productos`,{formData,product}); */
  }
  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.baseUrl}/productos/${id}`);
  }
  updateProduct(id:number,product:ProductElement){

    return this.http.put<ProductElement>(`${this.baseUrl}/productos/${id}`,product);
  }
  searchProduct(termino:string){
    return this.http.get<Product>(`${this.baseUrl}/search/productos/${termino}`);
  }
  searchProductById(id:string){
    return this.http.get<Product>(`${this.baseUrl}/search/producto/${id}`);
  }
}
