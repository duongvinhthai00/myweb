import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel, TransactionModel } from 'src/app/model/TransactionModel';

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
    return this.http.delete<Boolean>(`http://localhost:8080/api/v8/transaction/${tr_id}`);
  }

  getTransactionByID(tr_id : number){
    return this.http.get<TransactionModel>(`http://localhost:8080/api/v8/transaction-id/${tr_id}`);
  }

  getOrderByTransactionId(tr_id : number){
    return this.http.get<OrderModel[]>(`http://localhost:8080/api/v8/order-transaction/${tr_id}`);
  }
}
