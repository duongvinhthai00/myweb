import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { UserModel } from 'src/app/model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit{
  user : UserModel = null;
  constructor(private http : HttpClient) { }

  ngOnInit() {
  }

  SaveUser(data){
    return this.http.post(`http://localhost:8080/api/v1/users`,data).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error){
    return throwError(error);
  }

  UploadFile(file : File,id){
    const formData = new  FormData();
    formData.append('file',file);
    return this.http.post(`http://localhost:8080/api/v1/users/upload/${id}`,formData);
  }

  Login(data){
    return this.http.post<UserModel>(`http://localhost:8080/api/v1/users/login`,data).pipe(
      catchError(this.handleError)
    )
  }

}
