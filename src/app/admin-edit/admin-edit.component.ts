import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { AdminServiceService } from '../service/admin_service/admin-service.service';
import { AdminModel } from '../model/AdminModel';
import { AdminhomeComponent } from '../adminhome/adminhome.component';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class AdminEditComponent implements OnInit {
  adminForm : any;
  CheckSavePass = new FormGroup({
    oldPass : new FormControl(""),
    newPass : new FormControl(""),
    repeatPass : new FormControl("")
  })
  admin : AdminModel;
  constructor(private adminSer : AdminServiceService,private router : Router
    ,private adminC : AdminhomeComponent) { }

  ngOnInit(): void {
    let adminJson = JSON.parse(localStorage.getItem(this.adminSer.keyLogin));
    this.adminSer.GetAdminById(adminJson.id).subscribe(data=>{
      this.admin = data;
      this.adminC.admin = data;
      localStorage.setItem(this.adminSer.keyLogin,JSON.stringify(data));
      this.adminForm = new FormGroup({
      id : new FormControl(this.admin.id),
      phone : new FormControl(this.admin.phone),
      name : new FormControl(this.admin.name),
      email : new FormControl(this.admin.email),
      address : new FormControl(this.admin.address),
      password : new FormControl(this.admin.password),
      user_name : new FormControl(this.admin.user_name),
      avatar : new FormControl(this.admin.avatar)
      });
      if(this.admin.avatar != null){
        this.url = `../assets/image/${this.admin.avatar}`;
      }
    });
    
  }


  url = "https://via.placeholder.com/150x100";
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
    this.adminSer.UpdateAdmin(this.adminForm.value).subscribe(data=>{
      if(this.OneFile != null){
        this.adminSer.UploadFile(this.OneFile,data.id).subscribe(data=>{
        })
      }
      this.adminC.admin = data;
      localStorage.setItem(this.adminSer.keyLogin,JSON.stringify(data));
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
      if(this.CheckSavePass.value.oldPass != this.adminForm.value.password){
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
      this.adminForm.value.password = this.CheckSavePass.value.newPass;
      this.adminSer.UpdateAdmin(this.adminForm.value).subscribe(data=>{
        localStorage.setItem(this.adminSer.keyLogin,JSON.stringify(data));
        Swal.fire({
        title: "Cập Nhật Mật Khẩu Thành Công",
        icon: "success"
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this. router. onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/admin-edit']);
      })
    }

  }

}
