import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TransactionModel } from '../model/TransactionModel';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  transactions : TransactionModel[];
  constructor(private transactionService : TransactionServiceService,private homeComponent :HomeComponent) { }

  ngOnInit(): void {
    this.transactionService.getTransactionByUser(this.homeComponent.userLogined.id).subscribe(data=>{
      this.transactions = data;
      console.log(data);
    })
  }

}
