import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { AdminModel } from '../model/AdminModel';
import { OrderModel, TransactionModel } from '../model/TransactionModel';
import { AdminServiceService } from '../service/admin_service/admin-service.service';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-order-manager-detail',
  templateUrl: './order-manager-detail.component.html',
  styleUrls: ['./order-manager-detail.component.css']
})
export class OrderManagerDetailComponent implements OnInit {

  transaction : TransactionModel;
  constructor(private transactionService : TransactionServiceService,private route : ActivatedRoute,
    private adminSer : AdminServiceService) { }
  orderList : OrderModel[];
  admin : AdminModel[] = [];
  ngOnInit(): void {
    this.adminSer.GetAllAdmins().subscribe(data=>{
      this.admin = data;
    })
    this.route.params.pipe(
      pluck('slug')
    ).subscribe(slug=>{
      this.transactionService.getTransactionByID(slug).subscribe(data=>{
        this.transaction = data;
      })
      this.transactionService.getOrderByTransactionId(slug).subscribe(data=>{
        this.orderList = data;
      })
    });
  }

}
