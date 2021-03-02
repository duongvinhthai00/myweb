import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CategoryGroupModel, CategoryModel } from 'src/app/model/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {

  }

  getCategoryGroup(){
    return this.http.get<CategoryGroupModel[]>("http://localhost:8080/api/v3/categorygroup");
  }

  getCateGory(){
    return this.http.get<CategoryModel[]>("http://localhost:8080/api/v4/category");
  }

  getCateGoryById(id:number){
    return this.http.get<CategoryModel>(`http://localhost:8080/api/v4/category/${id}`);
  }

  getCateGoryDiffer(id:number,idCr:number){
    return this.http.post<CategoryModel[]>(`http://localhost:8080/api/v4/categorygetgroup/${id}`,idCr);
  }

}
