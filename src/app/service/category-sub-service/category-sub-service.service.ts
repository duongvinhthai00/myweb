import { CategoryModel } from './../../model/CategoryModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorySubServiceService {

  constructor(private http : HttpClient) { }

  AllCateGory(){
    return this.http.get<CategoryModel[]>(`http://localhost:8080/api/v4/category`);
  }

  DeleteCategory(id : number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v4/category/${id}`);
  }

  AddCateGory(categoryDTO : CategoryModel){
    return this.http.post<CategoryModel>(`http://localhost:8080/api/v4/category`,categoryDTO).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error){
    return throwError(error);
  }

  EditCateGory(categoryDTO : CategoryModel){
    return this.http.put<CategoryModel>(`http://localhost:8080/api/v4/category`,categoryDTO).pipe(
      catchError(this.handleError)
    );
  }

}
