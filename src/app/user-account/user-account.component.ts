import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from '../model/UserModel';
import { UserServiceService } from '../service/user_service/user-service.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class UserAccountComponent implements OnInit {
  userForm : any;
  CheckSavePass = new FormGroup({
    oldPass : new FormControl(""),
    newPass : new FormControl(""),
    repeatPass : new FormControl("")
  })
  user : UserModel;
  constructor(private userService : UserServiceService,private home : HomeComponent,private router : Router) { }

  ngOnInit(): void {
    let userJson = JSON.parse(localStorage.getItem(this.userService.keyLogin));
    this.userService.GetUserById(userJson.id).subscribe(data=>{
      console.log(data);
      this.home.userLogined = data;
      localStorage.setItem(this.userService.keyLogin,JSON.stringify(data));
      this.user = data;
      this.userForm = new FormGroup({
      id : new FormControl(this.user.id),
      phone : new FormControl(this.user.phone),
      name : new FormControl(this.user.name),
      email : new FormControl(this.user.email),
      address : new FormControl(this.user.address),
      password : new FormControl(this.user.password),
      user_name : new FormControl(this.user.user_name),
      avatar : new FormControl(this.user.avatar)
      });
      if(this.user.avatar != null){
        this.url = `../assets/image/${this.user.avatar}`;
      }
    });
    
    
  }


  url = "https://placehold.it/150x100";
  error : any;
  OneFile : File = null;
  ShowOneFileUpload(event){
    if(event.target.files){
      let render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
      render.onload = (e : any)=>{
        this.url = e.target.result;
      }
    }
    this.OneFile = event.target.files[0];
  }

  Submit(){
    this.userService.UpdateUser(this.userForm.value).subscribe(data=>{
      if(this.OneFile != null){
        this.userService.UploadFile(this.OneFile,data.id).subscribe(data=>{
        })
      }
      this.home.userLogined = data;
      localStorage.setItem(this.userService.keyLogin,JSON.stringify(data));
      Swal.fire({
        title: "Cập Nhật Thông Tin Thành Công",
        icon: "success"
      });
    },(error)=>{
      this.error = error.error;
    });
  }
  error1 : string = null;
  error2 : string = null;
  error3 : string = null;
  Submit2(){
    let ktra = 1;
    if(this.CheckSavePass.value.oldPass == ""){
      this.error1 = "Mật Khẩu Cũ Không Được Bỏ Trống";
      ktra = 0;
    }else{
      this.error1 = null;
    }
    if(this.CheckSavePass.value.newPass == ""){
      this.error2 = "Mật Khẩu Mới Không Được Bỏ Trống";
      ktra = 0;
    }else{
      this.error2 = null;
    }
    if(this.CheckSavePass.value.repeatPass == ""){
      this.error3 = "Lặp Lại Mật Khẩu Không Được Bỏ Trống";
      ktra = 0;
    }else{
      this.error3 = null;
    }

    if(ktra == 1){
      if(this.CheckSavePass.value.oldPass != this.userForm.value.password){
        this.error1 = "Mật Khẩu Cũ Không Chính Xác";
        ktra = 0;
      }else{
        this.error1 = null;
      }
      if(this.CheckSavePass.value.newPass != this.CheckSavePass.value.repeatPass){
        this.error3 = "Lặp Lại Mật Khẩu Mới Không Chính Xác";
        ktra = 0;
      }else{
        this.error3 = null;
      }
    }
    if(ktra == 1){
      this.userForm.value.password = this.CheckSavePass.value.newPass;
      this.userService.UpdateUser(this.userForm.value).subscribe(data=>{
        localStorage.setItem(this.userService.keyLogin,JSON.stringify(data));
        Swal.fire({
        title: "Cập Nhật Mật Khẩu Thành Công",
        icon: "success"
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this. router. onSameUrlNavigation = 'reload';
        this.router.navigate(['/user-account']);
      })
    }

  }
}
