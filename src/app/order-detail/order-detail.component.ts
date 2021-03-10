import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { OrderModel, TransactionModel } from '../model/TransactionModel';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  transaction : TransactionModel;
  constructor(private transactionService : TransactionServiceService,private route : ActivatedRoute) { }
  orderList : OrderModel[];
  ngOnInit(): void {
    this.route.params.pipe(
      pluck('slug')
    ).subscribe(slug=>{
      this.transactionService.getTransactionByID(slug).subscribe(data=>{
        this.transaction = data;
        console.log(this.transaction);
      })
      this.transactionService.getOrderByTransactionId(slug).subscribe(data=>{
        this.orderList = data;
        console.log(this.orderList);
      })
    });
  }

}
