import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminModel } from '../model/AdminModel';
import { AdminServiceService } from '../service/admin_service/admin-service.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  loginForm = new FormGroup({
    user_name : new FormControl(""),
    password : new FormControl("")
  })
  constructor(private adminService : AdminServiceService,private router : Router) { }

  ngOnInit(): void {
    this.adminAccount = JSON.parse(localStorage.getItem(this.adminService.keyLogin));
    if(this.adminAccount != null){
      this.router.navigate(["/admin"]);
    }
  }

  adminAccount : AdminModel;

  error : any = null;
  Submit(){
    this.adminService.Login(this.loginForm.value).subscribe(res=>{
      localStorage.setItem(this.adminService.keyLogin,JSON.stringify(res));
      this.router.navigate(["/admin"]);
    },(error)=>{
      this.error = error.error;
    });
  }

}
