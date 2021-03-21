import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';
import { CardModel } from '../model/CardModel';
import { TransactionModel, TransportModel } from '../model/TransactionModel';
import { CardServiceService } from '../service/card_service/card-service.service';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  card : CardModel[];
  transport : TransportModel[] = [];
  transactionForm = new FormGroup({
    name : new FormControl(this.homeComponent.userLogined?.name),
    tr_address :new FormControl(this.homeComponent.userLogined?.address),
    tr_phone : new FormControl(this.homeComponent.userLogined?.phone),
    tr_note : new FormControl(""),
    tr_transport_id : new FormControl(null),
    payment : new FormControl(null)
  });
  constructor(private homeComponent : HomeComponent,private router : Router,private cardService : CardServiceService,
    private TransactionService : TransactionServiceService) { }
  ngOnInit(): void {
    if(this.homeComponent.userLogined == null){
      this.router.navigate(['/login']);
    }else{
      if(environment.statusTransaction){
        this.router.navigate(['/card']);
      }else{
        this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
          this.card = data;
        });
        this.TransactionService.GetAllTransport().subscribe(data=>{
          this.transport = data;
        });
      }
    }
  }

  SumCard() : number{
    if(this.card != null){
      let tong = 0;
      for(let i = 0;i<this.card.length;i++){
      tong = tong + this.card[i].c_product_id.pro_pay*this.card[i].c_qty;
      }
      return tong;
    }
  }

  error : any;
  Submit(){
    let transaction : TransactionModel ={
      tr_total : this.SumCard(),
      tr_address :  this.transactionForm.value.tr_address,
      tr_phone : this.transactionForm.value.tr_phone,
      tr_note : this.transactionForm.value.tr_note,
      name : this.transactionForm.value.name,
      tr_user_id : this.homeComponent.userLogined,
      tr_transport_id : this.transactionForm.value.tr_transport_id,
      payment : this.transactionForm.value.payment,
      payment_status : 0
    }
    console.log(transaction);
    this.TransactionService.addTransaction(transaction).subscribe(data=>{
      this.homeComponent.totalCard = 0;
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đặt Hàng Thành Công',
          showConfirmButton: true,
      }).then(result=>{
        if(result.isConfirmed){
          if(transaction.payment == 1){
            Swal.fire({
              position: 'center',
              icon : 'info',
              title : 'Vui Lòng Thanh Toán Để Đơn Hàng Được Xử Lý',
              showConfirmButton: true,
            });
            this.router.navigate(['/payment-info/',data.id]);
          }
        } 
      })
      this.router.navigate(['/order']);
    },(error)=>{
      this.error = error.error;
    })
  }

}
