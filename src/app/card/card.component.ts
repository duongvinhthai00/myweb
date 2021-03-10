import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';
import { CardModel } from '../model/CardModel';
import { CardServiceService } from '../service/card_service/card-service.service';
import { TransactionComponent } from '../transaction/transaction.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card : CardModel[];
  constructor(public cardService : CardServiceService,private homeComponent : HomeComponent,private router : Router) { }

  SumCard(card : CardModel[]) : number{
    if(this.card != null){
      let tong = 0;
      for(let i = 0;i<card.length;i++){
      tong = tong + card[i].c_product_id.pro_pay*card[i].c_qty;
      }
      return tong;
    }
  }
  ngOnInit(): void {
    if(this.homeComponent.userLogined != null){
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
      })
    }else{
      this.router.navigate(['/login']);
    }
  }

  updateCard(card : CardModel,input : string){
    card.c_qty = parseInt(input);
    this.cardService.updateCard(card).subscribe(data=>{
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
      })
    },(error)=>{
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: true,
      })      
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
        this.homeComponent.totalCard = data.length;
      });
    })
  }

  deleteCard(id : number){
    this.cardService.deleteCard(id).subscribe(data=>{
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
        this.homeComponent.totalCard = data.length;
      })
    },(error)=>{
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Xóa Không Thành Công',
          showConfirmButton: true,
      })
    })
  }


  deleteAllCard(){
    this.cardService.deleteAllCard(this.homeComponent.userLogined.id).subscribe(data=>{
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
        this.homeComponent.totalCard = data.length;
      });
    });
  }

  check(){
    this.cardService.checkCardToTransaction(this.card,this.homeComponent.userLogined.id).subscribe(data=>{
      environment.statusTransaction = false;
      this.router.navigate(['/transaction']);
    },(error)=>{
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: true,
      })      
    });
  }

}
