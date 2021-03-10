import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionModel } from 'src/app/model/TransactionModel';

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
}
