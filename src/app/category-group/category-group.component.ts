import { CategoryGroupModel } from './../model/CategoryModel';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../service/category-service/category-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class CategoryGroupComponent implements OnInit {
  categoryGroup : CategoryGroupModel[] = [];
  keyAdmin = "adminLogined";
  displaynone = false;
  display = true;
  categoryGroupEdit : any;
  categoryGroupDel : number[] = [];
  categoryGroupForm = new FormGroup({
    name : new FormControl(""),
    group_author_id : new FormControl(JSON.parse(localStorage.getItem(this.keyAdmin)))
  })
  constructor(private group : CategoryServiceService,private router : Router) { }

  ngOnInit(): void {
    this.group.AllCateGroup().subscribe(data=>{
      this.categoryGroup = data;
    })
  }

  checkedBox(cb){
    if(cb.checked == false){
      cb.checked = true;
      this.categoryGroupDel.push(JSON.parse(cb.value).id);
    }else{
      cb.checked = false;
      this.categoryGroupDel = this.categoryGroupDel.filter(x=>{
        if(x != JSON.parse(cb.value).id){
          return true;
        }
      });
    }
    if(this.categoryGroupDel.length > 0){
      this.display = false;
    }else{
      this.display = true;
    }
  }

  DeleteCateGoryGroup(item : CategoryGroupModel){
    Swal.fire({
      icon:'warning',
      title: 'Bạn Có Thực Sự Muốn Xóa Danh Mục Cha Này',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText : 'Hủy'
      }).then((result) => {
      if (result.isConfirmed) {
        this.group.DeleteCateGroup(item.id).subscribe(data=>{
          this.group.AllCateGroup().subscribe(data=>{
            this.categoryGroup = data;
          });
          Swal.fire('Xóa Thành Công!', '', 'success');
        },(error)=>{
          Swal.fire('Xóa Không Thành Công!', '', 'error');
        })  
      }
      });
    this.categoryGroupDel = [];
  }

  error : any;
  SubmitAdd(){
    this.group.AddCateGroup(this.categoryGroupForm.value).subscribe(data=>{
      Swal.fire({
        title : "Thêm Danh Mục Cha Thành Công",
        icon : "success"
      })
      this.displaynone = true;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this. router. onSameUrlNavigation = 'reload';
      this.router.navigate(['/admin/category-group-manager']);
    },(error)=>{
      this.error = error.error;
    })
  }


  deleteAllCateGroup(){
    Swal.fire({
    icon:'warning',
    title: `Bạn Có Thực Sự Muốn Xóa ${this.categoryGroupDel.length} Danh Mục Cha Này`,
    showCancelButton: true,
    confirmButtonText: `Xóa`,
    cancelButtonText : 'Hủy'
    }).then((result) => {
    if (result.isConfirmed) {
      for(let i = 0;i<this.categoryGroupDel.length;i++){
        this.group.DeleteCateGroup(this.categoryGroupDel[i]).subscribe(data=>{
          this.group.AllCateGroup().subscribe(data=>{
            this.categoryGroup = data;
          });
        });
      }
      Swal.fire('Xóa Thành Công!', '', 'success');
      this.categoryGroupDel = [];
    }
    });
  }

  ShowCateGroyGroup(item : CategoryGroupModel){
    this.categoryGroupEdit = new FormGroup({
      id : new FormControl(item.id),
      name : new FormControl(item.name),
      group_author_id : new FormControl(JSON.parse(localStorage.getItem(this.keyAdmin)))
    })
  }
  error2 : any;
  SubmitEdit(){
    this.group.EditCateGroup(this.categoryGroupEdit.value).subscribe(data=>{
      this.group.AllCateGroup().subscribe(data=>{
        this.categoryGroup = data;
      });
      Swal.fire({
        title : "Chỉnh Sửa Thành Công",
        icon : "success"
      })
    },(error)=>{
      this.error2 = error.error;
    })
  }

}
