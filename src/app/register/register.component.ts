import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../service/user_service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl(""),
    user_name : new FormControl(""),
    phone : new FormControl("") ,
    address: new FormControl("")
  });
  message : string;
  seletedFile : File = null;
  constructor(private UserService : UserServiceService,private route : Router){}
  registerSuccess : any;
  selectedFile(event){
    console.log(event.target.files);
    this.seletedFile = event.target.files[0];
  }

  onSuccess(){
    setTimeout(()=>{
      this.route.navigate(['/login']);
    },2000)
  }

  Submit(){
    console.log(this.registerForm.value);
    this.UserService.SaveUser(this.registerForm.value).subscribe(data=>{
      console.log(data);
        this.UserService.UploadFile(this.seletedFile,data).subscribe(data=>{
          this.registerSuccess = data;
          this.onSuccess();
        });
    },(error=>{
      this.message = error.error.message;
    }));
  }
}
