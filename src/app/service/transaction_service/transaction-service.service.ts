import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel, RevenueModel, TransactionModel, TransportModel } from 'src/app/model/TransactionModel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(private http : HttpClient) { }

  addTransaction(transactionDTO : TransactionModel){
    return this.http.post<TransactionModel>("http://localhost:8080/api/v8/transaction",transactionDTO);
  }

  getTransactionByUser(userId : number){
    return this.http.get<TransactionModel[]>(`http://localhost:8080/api/v8/transaction/${userId}`);
  }

  deleteTransaction(tr_id : number){
    return this.http.delete(`http://localhost:8080/api/v8/transaction/${tr_id}`);
  }

  getTransactionByID(tr_id : number){
    return this.http.get<TransactionModel>(`http://localhost:8080/api/v8/transaction-id/${tr_id}`);
  }

  getOrderByTransactionId(tr_id : number){
    return this.http.get<OrderModel[]>(`http://localhost:8080/api/v8/order-transaction/${tr_id}`);
  }

  updateProductNumber(tr_id : Number){
    return this.http.put<Boolean>("http://localhost:8080/api/v8/order-transaction",tr_id);
  }

  GetAllTransaction(){
    return this.http.get<TransactionModel[]>(`http://localhost:8080/api/v8/transaction-all`);
  }

  updateTransaction(transactionDTO : TransactionModel){
    return this.http.put<TransactionModel>(`http://localhost:8080/api/v8/transaction-update`,transactionDTO).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error){
    return throwError(error);
  }

  GetAllTransport(){
    return this.http.get<TransportModel[]>(`http://localhost:8080/api/v9/transport-all`);
  }
  
  DeleteTransport(id : number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v9/transport-del/${id}`);
  }

  AddTransport(transportDTO : TransportModel){
    return this.http.post<TransportModel>(`http://localhost:8080/api/v9/transport-add`,transportDTO).pipe(
      catchError(this.handleError)
    );
  }

  GetTransportById(id : number){
    return this.http.get<TransportModel>(`http://localhost:8080/api/v9/get-transport/${id}`);
  }

  GetRevenue(fromDay:string,toDay:string){
    console.log(fromDay,toDay);
    return this.http.get<RevenueModel>(`http://localhost:8080/api/v8/get-revenue/${fromDay}/${toDay}`);
  }

}
