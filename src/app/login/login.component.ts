import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private userService : UserServiceService) { }

  ngOnInit(): void {
  }

  Submit(){
    this.userService.Login(this.loginForm.value).subscribe(res=>{
        console.log(res);
    },(error)=>{
      console.log(error.error)
    })
  }

}
