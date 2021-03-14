import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminModel } from 'src/app/model/AdminModel';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  keyLogin = "adminLogined"

  constructor(private http : HttpClient) { }

  handleError(error){
    return throwError(error);
  }

  Login(data){
    return this.http.post<AdminModel>(`http://localhost:8080/api/v2/admins/login`,data).pipe(
      catchError(this.handleError)
    );
  }

}
