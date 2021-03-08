import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  status = true;

  constructor(private homeComponent : HomeComponent,private router : Router) { }
  ngOnInit(): void {
    if(this.homeComponent.userLogined == null){
      this.router.navigate(['/login']);
    }else{
      if(status){
        this.router.navigate(['/card']);
      }
    }
  }

}
