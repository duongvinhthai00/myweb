import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageModel, ProductModel } from 'src/app/model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http : HttpClient) { }

  getProductByCategory(id:number){
    return this.http.get<ProductModel[]>(`http://localhost:8080/api/v5/products/${id}`);
  }

  getImagesByProduct(id:number){
    return this.http.get<ImageModel[]>(`http://localhost:8080/api/v6/images/${id}`);
  }

  getProductById(id:number){
    return this.http.get<ProductModel>(`http://localhost:8080/api/v5/product/${id}`);
  }

  getProductAll(){
    return this.http.get<ProductModel[]>(`http://localhost:8080/api/v5/products`);
  }

  getProductSeach(searchInput : string){
    return this.http.post<ProductModel[]>(`http://localhost:8080/api/v5/search-products`,searchInput);
  }

  DeleteProduct(id : number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v5/products/${id}`);
  }

}
