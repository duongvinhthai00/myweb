import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http : HttpClient) { }

  getProductByCategory(id:number){
    return this.http.get<ProductModel[]>(`http://localhost:8080/api/v5/products/${id}`);
  }

}
