import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';
import { CardModel } from '../model/CardModel';
import { TransactionModel } from '../model/TransactionModel';
import { CardServiceService } from '../service/card_service/card-service.service';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  card : CardModel[];
  transactionForm = new FormGroup({
    name : new FormControl(this.homeComponent.userLogined?.name),
    tr_address :new FormControl(this.homeComponent.userLogined?.address),
    tr_phone : new FormControl(this.homeComponent.userLogined?.phone),
    tr_note : new FormControl(""),
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
      tr_user_id : this.homeComponent.userLogined
    }
    this.TransactionService.addTransaction(transaction).subscribe(data=>{
      this.homeComponent.totalCard = 0;
      alert("Đặt Hàng Thành Công");
      this.router.navigate(['/']);
    },(error)=>{
      this.error = error.error;
    })
  }

}
