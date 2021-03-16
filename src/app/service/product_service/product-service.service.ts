import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  addProduct(productDTO : ProductModel){
    return this.http.post<ProductModel>(`http://localhost:8080/api/v5/add-product`,productDTO).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error){
    return throwError(error);
  }

  uploadOneImage(id : number,file : File){
    const formData = new  FormData();
    formData.append('file',file);
    return this.http.post<Boolean>(`http://localhost:8080/api/v5/product/upload/${id}`,formData);
  }

  uploadManyImage(id : number,file : File){
    const formData = new  FormData();
    formData.append('file',file);
    return this.http.post<Boolean>(`http://localhost:8080/api/v6/product-image-upload/${id}`,formData);
  }

}
