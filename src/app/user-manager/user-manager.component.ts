import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/UserModel';
import { UserServiceService } from '../service/user_service/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class UserManagerComponent implements OnInit {
  user_list : UserModel[] = [];
  constructor(private userSer : UserServiceService) { }
  page : number = 1;
  maxPageItems = 8;
  ngOnInit(): void {
    this.userSer.GetAllUser().subscribe(data=>{
      this.user_list = data;
    })
  }

  searchText: any;
  deleteUser(user : UserModel){
      Swal.fire({
      icon:'warning',
      title: 'Bạn Có Thực Sự Muốn Xóa Người Dùng Này',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText : 'Hủy'
      }).then((result) => {
      if (result.isConfirmed) {
        this.userSer.DeleteUserById(user.id).subscribe(data=>{
          this.userSer.GetAllUser().subscribe(data=>{
            this.user_list = data;
          });
          Swal.fire('Xóa Thành Công!', '', 'success');
        },(error)=>{
          Swal.fire('Xóa Không Thành Công!', '', 'error');
        })  
      }
      });
  }

  pageChanged(event){
    this.page = event;
  }

}
