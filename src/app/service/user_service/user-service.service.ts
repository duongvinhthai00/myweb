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
  keyLogin = "userLogin";
  constructor(private http : HttpClient) { }

  ngOnInit() {
    console.log(this.user);
  }

  ngOnchange(){
    this.user = JSON.parse(localStorage.getItem(this.keyLogin));
    console.log('change');
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

  GetUserById(id : number){
    return this.http.get<UserModel>(`http://localhost:8080/api/v1/users/${id}`);
  }

  UpdateUser(userDTO : UserModel){
    return this.http.put<UserModel>(`http://localhost:8080/api/v1/users`,userDTO).pipe(
      catchError(this.handleError)
    );
  }

}
