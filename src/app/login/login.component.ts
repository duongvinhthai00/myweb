import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CardServiceService } from '../service/card_service/card-service.service';
import { UserServiceService } from '../service/user_service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user_name : new FormControl(""),
    password : new FormControl("")
  })
  constructor(private userService : UserServiceService,private route : Router,public homeComponent : HomeComponent,private cardService : CardServiceService) { }

  ngOnInit(): void {
    if(this.homeComponent.userLogined != null){
      this.route.navigate(["/all-products"]);
    }
  }

  error : any = null;
  Submit(){
    this.userService.Login(this.loginForm.value).subscribe(res=>{
        localStorage.setItem(this.userService.keyLogin,JSON.stringify(res));
        this.homeComponent.userLogined = JSON.parse(localStorage.getItem(this.userService.keyLogin));
        this.cardService.getCard(this.homeComponent.userLogined.id).subscribe(data=>{
          this.homeComponent.totalCard = data.length;
        });
      this.route.navigate(["/all-products"]);
    },(error)=>{
      this.error = error.error
      console.log(this.error);
    })
  }

}
