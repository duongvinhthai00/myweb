import { CategoryGroupModel } from './../../model/CategoryModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http : HttpClient) { }

  AllCateGroup(){
    return this.http.get<CategoryGroupModel[]>(`http://localhost:8080/api/v3/categorygroup`);
  }

  DeleteCateGroup(id : number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v3/categorygroup/${id}`);
  }
  
  AddCateGroup(categoryGroupDTO : CategoryGroupModel){
    return this.http.post<CategoryGroupModel>(`http://localhost:8080/api/v3/categorygroup`,categoryGroupDTO).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error){
    return throwError(error);
  }

  EditCateGroup(categoryGroupDTO : CategoryGroupModel){
    return this.http.put<CategoryGroupModel>(`http://localhost:8080/api/v3/categorygroup`,categoryGroupDTO).pipe(
      catchError(this.handleError)
    );
  }
}
