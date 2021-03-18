import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/ProductModel';
import { ProductServiceService } from '../service/product_service/product-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css'
]
})

export class ProductmanagerComponent implements OnInit {
  ProductListDel : number[] = [];
  products : ProductModel[];
  maxPageItems = 5;
  page:number = 1;
  searchText;
  constructor(private productService : ProductServiceService) {
   }

  ngOnInit(): void {
    this.productService.getProductAll().subscribe(data=>{
      this.products = data;
    });
  }

  pageChanged(event){
    this.page = event;
  }

  logValue(event){
    this.maxPageItems = event.currentTarget.value;
  }

  checkedBox(cb){
    if(cb.checked == false){
      cb.checked = true;
      this.ProductListDel.push(JSON.parse(cb.value).id);
      console.log(this.ProductListDel);
    }else{
      cb.checked = false;
      this.ProductListDel = this.ProductListDel.filter(x=>{
        if(x != JSON.parse(cb.value).id){
          return true;
        }
      });
      console.log(this.ProductListDel);
    }
    
  }

  DeleteProduct(item : ProductModel){
    Swal.fire({
      icon:'warning',
      title: 'Bạn Có Thực Sự Muốn Xóa Sản Phẩm Này',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText : 'Hủy'
      }).then((result) => {
      if (result.isConfirmed) {
        this.productService.DeleteProduct(item.id).subscribe(data=>{
          this.productService.getProductAll().subscribe(data=>{
            this.products = data;
          });
          Swal.fire('Xóa Thành Công!', '', 'success');
        },(error)=>{
          Swal.fire('Xóa Không Thành Công!', '', 'error');
        })  
      }
      });
  }

  deleteAllProduct(){
    Swal.fire({
    icon:'warning',
    title: `Bạn Có Thực Sự Muốn Xóa ${this.ProductListDel.length} Sản Phẩm Này`,
    showCancelButton: true,
    confirmButtonText: `Xóa`,
    cancelButtonText : 'Hủy'
    }).then((result) => {
    if (result.isConfirmed) {
      for(let i = 0;i<this.ProductListDel.length;i++){
        this.productService.DeleteProduct(this.ProductListDel[i]).subscribe(data=>{
          this.productService.getProductAll().subscribe(data=>{
            this.products = data;
          });
        });
      }
      Swal.fire('Xóa Thành Công!', '', 'success');
      this.ProductListDel = [];
    }
    });
  }
}
