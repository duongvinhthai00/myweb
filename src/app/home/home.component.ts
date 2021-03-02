import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryGroupModel, CategoryModel } from '../model/CategoryModel';
import { UserModel } from '../model/UserModel';
import { HomeServiceService } from '../service/user_service/home_service/home-service.service';
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
  constructor(public userService : UserServiceService,private homeService : HomeServiceService) { }

  ngOnInit(): void {
    this.userLogined = JSON.parse(localStorage.getItem(this.userService.keyLogin));
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
  }

}
