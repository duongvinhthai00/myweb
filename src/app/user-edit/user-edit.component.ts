import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from '../model/UserModel';
import { UserServiceService } from '../service/user_service/user-service.service';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { pluck } from 'rxjs/operators';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class UserEditComponent implements OnInit {
    userForm : any;
    CheckSavePass = new FormGroup({
    oldPass : new FormControl(""),
    newPass : new FormControl(""),
    repeatPass : new FormControl("")
  })
  user : UserModel;
  constructor(private userService : UserServiceService,private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('slug')).subscribe(slug=>{
      this.userService.GetUserById(slug).subscribe(data=>{
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
      Swal.fire({
        title: "Cập Nhật Thông Tin Thành Công",
        icon: "success"
      });
      this.router.navigate(['/admin/user-manager']);
    },(error)=>{
      this.error = error.error;
    });
  }
  
}
