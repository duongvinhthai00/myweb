import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentInfoModel } from 'src/app/model/PaymentInfoModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http : HttpClient) { }

  GetAllPaymentInfo(){
    return this.http.get<PaymentInfoModel[]>(`http://localhost:8080/api/v10/payment-info-all`);
  }

  DeletePaymentInfo(id : number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v10/payment-info/${id}`);
  }

  AddPaymentInfo(paymentInfoDTO : PaymentInfoModel){
    return this.http.post<PaymentInfoModel>(`http://localhost:8080/api/v10/payment-info-add`,paymentInfoDTO).pipe(
      catchError(this.handleError)
    )
  }

  UploadFile(file : File,id){
    const formData = new  FormData();
    formData.append('file',file);
    return this.http.post(`http://localhost:8080/api/v10/payment-upload/${id}`,formData);
  }

  handleError(error){
    return throwError(error);
  }

  GetPaymentInfoById(id : number){
    return this.http.get<PaymentInfoModel>(`http://localhost:8080/api/v10/payment-info/${id}`);
  }

  UpdatePayment(paymentInfoDTO : PaymentInfoModel){
    return this.http.put<PaymentInfoModel>(`http://localhost:8080/api/v10/payment-update`,paymentInfoDTO);
  }
}
