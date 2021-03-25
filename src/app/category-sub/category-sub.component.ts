import { CategoryServiceService } from './../service/category-service/category-service.service';
import { CategorySubServiceService } from './../service/category-sub-service/category-sub-service.service';
import { CategoryModel, CategoryGroupModel } from './../model/CategoryModel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-sub',
  templateUrl: './category-sub.component.html',
  styleUrls: ['./category-sub.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class CategorySubComponent implements OnInit {
  category : CategoryModel[] = [];
  displaynone = false;
  display = true;
  categoryEdit : any;
  categoryDel : number[] = [];
  caGroup : CategoryGroupModel[] = [];
  caGroupFake : CategoryGroupModel[] = [];
  categoryForm = new FormGroup({
    c_name : new FormControl(""),
    c_group_id : new FormControl(null)
  })
  constructor(private categorySub : CategorySubServiceService,private router : Router,
    private categoryGroup : CategoryServiceService) { }

  ngOnInit(): void {
    this.categorySub.AllCateGory().subscribe(data=>{
      this.category = data;
    });
    this.categoryGroup.AllCateGroup().subscribe(data=>{
      this.caGroup = data;
    });
  }

  checkedBox(cb){
    if(cb.checked == false){
      cb.checked = true;
      this.categoryDel.push(JSON.parse(cb.value).id);
    }else{
      cb.checked = false;
      this.categoryDel = this.categoryDel.filter(x=>{
        if(x != JSON.parse(cb.value).id){
          return true;
        }
      });
    }
    if(this.categoryDel.length > 0){
      this.display = false;
    }else{
      this.display = true;
    }
  }

  DeleteCateGory(item : CategoryModel){
    Swal.fire({
      icon:'warning',
      title: 'Bạn Có Thực Sự Muốn Xóa Danh Mục Con Này',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText : 'Hủy'
      }).then((result) => {
      if (result.isConfirmed) {
        this.categorySub.DeleteCategory(item.id).subscribe(data=>{
          this.categorySub.AllCateGory().subscribe(data=>{
            this.category = data;
          });
          Swal.fire('Xóa Thành Công!', '', 'success');
        },(error)=>{
          Swal.fire('Xóa Không Thành Công!', '', 'error');
        })  
      }
      });
    this.categoryDel = [];
  }

  error : any;
  SubmitAdd(){
    this.categorySub.AddCateGory(this.categoryForm.value).subscribe(data=>{
      Swal.fire({
        title : "Thêm Danh Mục Cha Thành Công",
        icon : "success"
      })
      this.displaynone = true;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this. router. onSameUrlNavigation = 'reload';
      this.router.navigate(['/admin/category-manager']);
    },(error)=>{
      this.error = error.error;
    })
  }


  deleteAllCateGory(){
    Swal.fire({
    icon:'warning',
    title: `Bạn Có Thực Sự Muốn Xóa ${this.categoryDel.length} Danh Mục Con Này Này`,
    showCancelButton: true,
    confirmButtonText: `Xóa`,
    cancelButtonText : 'Hủy'
    }).then((result) => {
    if (result.isConfirmed) {
      for(let i = 0;i<this.categoryDel.length;i++){
        this.categorySub.DeleteCategory(this.categoryDel[i]).subscribe(data=>{
          this.categorySub.AllCateGory().subscribe(data=>{
            this.category = data;
          });
        });
      }
      Swal.fire('Xóa Thành Công!', '', 'success');
      this.categoryDel = [];
    }
    });
  }
  itemfake : CategoryGroupModel;
  
  ShowCateGory(item : CategoryModel){
    this.caGroupFake = this.caGroup.filter(x=>{
      if(x.id != item.c_group_id.id){
        return true;
      }
    })
    this.itemfake = item.c_group_id;
    this.categoryEdit = new FormGroup({
      id : new FormControl(item.id),
      c_name : new FormControl(item.c_name),
      c_group_id : new FormControl(item.c_group_id)
    })
  }
  error2 : any;
  SubmitEdit(){
    this.categorySub.EditCateGory(this.categoryEdit.value).subscribe(data=>{
      this.categorySub.AllCateGory().subscribe(data=>{
        this.category = data;
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
