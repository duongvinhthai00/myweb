import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoryGroupModel, CategoryModel } from '../model/CategoryModel';
import { UserModel } from '../model/UserModel';
import { CardServiceService } from '../service/card_service/card-service.service';
import { HomeServiceService } from '../service/home_service/home-service.service';
import { UserServiceService } from '../service/user_service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogined : UserModel;
  cateGoryGroupList : CategoryGroupModel[];
  cateGoryList : CategoryModel[];
   totalCard : number = 0;
  constructor(public userService : UserServiceService,private homeService : HomeServiceService
    ,private cardService : CardServiceService,private router : Router) { }

  ngOnInit(): void {
    this.userLogined = JSON.parse(localStorage.getItem(this.userService.keyLogin));
    if(this.userLogined != null){
      this.cardService.getCard(this.userLogined.id).subscribe(data=>{
        this.totalCard = data.length;
      });
    }

    this.homeService.getCategoryGroup().subscribe(data=>{
      this.cateGoryGroupList = data;
    })
    this.homeService.getCateGory().subscribe(data=>{
      this.cateGoryList = data
    })
  }

  Logout(){
    localStorage.removeItem(this.userService.keyLogin);
    this.userLogined = null;
    this.totalCard = 0;
    this.router.navigate(['/login']);
  }

}
