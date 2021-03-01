import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
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
  constructor(private userService : UserServiceService,private route : Router,public homeComponent : HomeComponent) { }

  ngOnInit(): void {
  }

  error : any = null;
  Submit(){
    this.userService.Login(this.loginForm.value).subscribe(res=>{
      localStorage.setItem(this.userService.keyLogin,JSON.stringify(res));
        this.homeComponent.userLogined = JSON.parse(localStorage.getItem(this.userService.keyLogin));
      this.route.navigate(["/"])
    },(error)=>{
      this.error = error.error
      console.log(this.error);
    })
  }

}
