import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/UserModel';
import { UserServiceService } from '../service/user_service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userService : UserServiceService) { }

  ngOnInit(): void {
  }

}
