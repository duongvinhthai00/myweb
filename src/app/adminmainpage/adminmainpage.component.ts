import { PaymentServiceService } from './../service/payment_service/payment-service.service';
import { ProductServiceService } from './../service/product_service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-adminmainpage',
  templateUrl: './adminmainpage.component.html',
  styleUrls: ['./adminmainpage.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
]
})
export class AdminmainpageComponent implements OnInit {
  totalMoney : number = 0;
  newOrderNumber : number = 0;
  ProductNumber : number = 0;
  paymentNumber : number = 0;
  constructor(private TransactionSer : TransactionServiceService,
    private productSer : ProductServiceService,private paymentSer : PaymentServiceService) { }
  ngOnInit(): void {
    this.TransactionSer.GetRevenue('1999-01-01','2222-01-01').subscribe(data=>{
      this.totalMoney = data.total;
      console.log(this.totalMoney);
    });
    this.TransactionSer.GetAllTransaction().subscribe(data=>{
        this.newOrderNumber = data.filter(x=>{
          return x.tr_status === 0
        }).length;
    });
    this.productSer.getProductAll().subscribe(data=>{
      this.ProductNumber = data.length;
    });
    this.paymentSer.GetAllPaymentInfo().subscribe(data=>{
      this.paymentNumber = data.length;
    })
  }

}
