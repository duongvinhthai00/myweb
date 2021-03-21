import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { PaymentInfoModel } from '../model/PaymentInfoModel';
import { TransactionModel } from '../model/TransactionModel';
import { PaymentServiceService } from '../service/payment_service/payment-service.service';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentInfo : PaymentInfoModel[];
  transaction : TransactionModel
  constructor(private paymentService : PaymentServiceService,private transactionService : TransactionServiceService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.paymentService.GetAllPaymentInfo().subscribe(data=>{
      this.paymentInfo = data;
    });
    this.route.params.pipe(pluck('slug')).subscribe(slug=>{
      this.transactionService.getTransactionByID(slug).subscribe(data=>{
        this.transaction = data;
      });
    });
  }

}
