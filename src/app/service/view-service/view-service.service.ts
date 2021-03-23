import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
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
  
}
