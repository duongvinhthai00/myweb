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

  UploadFile(file : File,id){
    const formData = new  FormData();
    formData.append('file',file);
    return this.http.post(`http://localhost:8080/api/v2/admins/upload/${id}`,formData);
  }

  GetAdminById(id : number){
    return this.http.get<AdminModel>(`http://localhost:8080/api/v2/admins/${id}`);
  }
  GetAllAdmins(){
    return this.http.get<AdminModel[]>(`http://localhost:8080/api/v2/admins`);
  }

  UpdateAdmin(adminDTO : AdminModel){
    return this.http.put<AdminModel>(`http://localhost:8080/api/v2/admins`,adminDTO).pipe(
      catchError(this.handleError)
    );
  }

}
