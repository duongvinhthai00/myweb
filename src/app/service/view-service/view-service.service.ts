import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductModel } from 'src/app/model/ProductModel';
import { ViewModel } from 'src/app/model/ViewModel';

@Injectable({
  providedIn: 'root'
})
export class ViewServiceService {

  constructor(private http : HttpClient) { }

  SaveView(viewDTO : ViewModel){
    return this.http.post<ViewModel>(`http://localhost:8080/api/v11/save-view`,viewDTO);
  }

  CheckRating(viewDTO : ViewModel){
    return this.http.post<Boolean>(`http://localhost:8080/api/v11/check-rating`,viewDTO);
  }

  SaveRating(viewDTO : ViewModel){
    return this.http.post<ViewModel>(`http://localhost:8080/api/v11/save-rating`,viewDTO);
  }

  GetView(pro_id,user_id){
    return this.http.get<ViewModel>(`http://localhost:8080/api/v11/get-view/${pro_id}/${user_id}`).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error){
    return throwError(error);
  }

  UpdateProductRate(){
    return this.http.get(`http://localhost:8080/api/v11/update-prouduct-rating`);
  }
  
  GetListProductByUser(pro_id : number,group_id : number){
    return this.http.get<ProductModel[]>(`http://localhost:8080/api/v11/get-product-user/${pro_id}/${group_id}`)
  }

}
