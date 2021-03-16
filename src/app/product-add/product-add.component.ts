import { ProductModel } from 'src/app/model/ProductModel';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryModel } from 'src/app/model/CategoryModel';
import { HomeServiceService } from './../service/home_service/home-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class ProductAddComponent implements OnInit {
  description : string = '<p>Some html</p>';
  content : string = '<p>Some html</p>';
  formAddProduct = new FormGroup({
    name : new FormControl(""),
    price : new FormControl(""),
    sale : new FormControl(""),
    hot : new FormControl(""),
    number : new FormControl(""),
    place_sale : new FormControl(""),
    category_id : new FormControl("")
  });
  constructor(private homeService : HomeServiceService) { }

  url = "https://placehold.it/150x100";
  url2 = "https://placehold.it/150x100";
  url3 : string[] = [];
  categoryList : CategoryModel[] = [];
  ngOnInit(): void {
    this.homeService.getCateGory().subscribe(data=>{
      this.categoryList = data;
    })
  }

  onTouched() { }

  refresh(){
    this.url3 = [];
  }

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

  ManyFile : File = null;
  ShowManyFileUpload(event){
    if(event.target.files){
      console.log(event.target.files.length);
      for(let i = 0;i<event.target.files.length;i++){
        let render = new FileReader();
        render.readAsDataURL(event.target.files[i]);
        render.onload = (e : any)=>{
        this.url3.push(e.target.result);
      }
      }
    }
    this.ManyFile = event.target.files;
  }

  Submit(){
    let product : ProductModel = {
      pr_name : this.formAddProduct.value.name,
      pro_price : this.formAddProduct.value.price,
      pro_sale : this.formAddProduct.value.sale,
      pro_hot : this.formAddProduct.value.hot,
      pro_number : this.formAddProduct.value.number,
      pro_place_sale : this.formAddProduct.value.place_sale,
      pro_category_id : this.formAddProduct.value.category_id,
      pro_description : this.description,
      pro_content : this.content,
    }
    console.log(product);
    if(this.OneFile == null){
      Swal.fire({
        icon: 'error',
        text: 'File Ảnh Không Được Để Trống',
      });
    }
  }

}
