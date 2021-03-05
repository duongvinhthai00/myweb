import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CardModel } from '../model/CardModel';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CardServiceService } from '../service/card_service/card-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card : CardModel[];
  constructor(public cardService : CardServiceService,private homeComponent : HomeComponent,private router : Router) { }

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
    console.log(card);
    this.cardService.updateCard(card).subscribe(data=>{
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
        console.log(this.card);
      })
    })
  }

  deleteCard(id : number){
    this.cardService.deleteCard(id).subscribe(data=>{
      this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
        this.card = data;
        console.log(this.card);
      })
      alert('Xoá Thành Công');
    },(error)=>{
      alert('Xoá Không Thành Công');
    })
  }

}
