import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/UserModel';
import { UserServiceService } from '../service/user_service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogined : UserModel;
  constructor(public userService : UserServiceService) { }

  ngOnInit(): void {
    this.userLogined = JSON.parse(localStorage.getItem(this.userService.keyLogin));
  }

  Logout(){
    localStorage.removeItem(this.userService.keyLogin);
    this.userLogined = null;
  }
  
}
