import { ProductModel, ImageModel } from './../model/ProductModel';
import { pluck } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../model/CategoryModel';
import { HomeServiceService } from '../service/home_service/home-service.service';
import { ProductServiceService } from '../service/product_service/product-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css',
    '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
    '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
    '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
  ]
})
export class ProductEditComponent implements OnInit {
  formAddProduct = new FormGroup({
    name: new FormControl(""),
    price: new FormControl(""),
    sale: new FormControl(""),
    hot: new FormControl(""),
    number: new FormControl(""),
    place_sale: new FormControl(""),
    category_id: new FormControl(""),
    description: new FormControl(""),
    content: new FormControl("")
  });
  constructor(private homeService: HomeServiceService, private productService: ProductServiceService
    , private router: Router, private route: ActivatedRoute) { }

  url = "https://placehold.it/150x100";
  url2 = "https://placehold.it/150x100";
  url3: string[] = [];
  categoryList: CategoryModel[] = [];
  ProductDetail: ProductModel = null;
  ImageList: ImageModel[] = [];
  ngOnInit(): void {
    this.route.params.pipe(pluck('slug')).subscribe(data => {
      this.productService.getProductById(data).subscribe(data => {
        this.ProductDetail = data;
        this.productService.getImagesByProduct(data.id).subscribe(data => {
          this.ImageList = data;
        });
        this.formAddProduct.value.name = data.pr_name;
        console.log("Ten",this.formAddProduct.value.name);
        this.url = `../assets/image/${this.ProductDetail.pro_avatar}`;
        this.formAddProduct.value.description = this.ProductDetail.pro_description;
        this.formAddProduct.value.content = this.ProductDetail.pro_content;
        this.homeService.getCateGory().subscribe(data => {
          this.categoryList = data.filter(x => {
            if (x.id != this.ProductDetail.id) {
              return true;
            }
          });
        });
      })
    });
    if (this.ImageList.length > 0) {
      for (let i = 0; i < this.ImageList.length; i++) {
        this.url3.push(`../assets/image/${this.ImageList[i].im_name}`);
      }
    }

  }

  refresh() {
    this.url3 = [];
  }

  OneFile: File = null;
  ShowOneFileUpload(event) {
    if (event.target.files) {
      let render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
      render.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
    this.OneFile = event.target.files[0];
  }

  ManyFile: File[] = [];
  ShowManyFileUpload(event) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        let render = new FileReader();
        render.readAsDataURL(event.target.files[i]);
        render.onload = (e: any) => {
          this.url3.push(e.target.result);
        }
      }
    }
    this.ManyFile = event.target.files;
  }

  Submit() {
    let product: ProductModel = {
      pr_name: this.formAddProduct.value.name,
      pro_price: this.formAddProduct.value.price,
      pro_sale: this.formAddProduct.value.sale,
      pro_hot: this.formAddProduct.value.hot,
      pro_number: this.formAddProduct.value.number,
      pro_place_sale: this.formAddProduct.value.place_sale,
      pro_category_id: this.formAddProduct.value.category_id,
      pro_description: this.formAddProduct.value.description,
      pro_content: this.formAddProduct.value.content,
    }

    if (this.formAddProduct.value.hot == true) {
      product.pro_hot = 1
    } else {
      product.pro_hot = 0;
    }
    product.pro_pay = product.pro_price - (product.pro_price * (product.pro_sale / 100));
    if (this.OneFile == null) {
      Swal.fire({
        icon: 'error',
        text: 'File Ảnh Sản Phẩm Không Được Để Trống',
      });
    } else {
      this.productService.addProduct(product).subscribe(data => {
        this.productService.uploadOneImage(data.id, this.OneFile).subscribe(data => {
          console.log(data);
        });
        if (this.ManyFile.length > 0) {
          for (let i = 0; i < this.ManyFile.length; i++) {
            this.productService.uploadManyImage(data.id, this.ManyFile[i]).subscribe(data => {
              console.log(data);
            });
          }
        }
        Swal.fire({
          icon: 'success',
          text: 'Thêm Thành Công Sản Phẩm',
        });
        this.router.navigate(['/admin/product-manager']);
      }, (error) => {
        let s = ""
        if (error.error.pr_name) {
          s = s + error.error.pr_name;
        }
        if (error.error.pro_price) {
          s = s + error.error.pro_price;
        }
        if (error.error.pro_number) {
          s = s + error.error.pro_number;
        }
        Swal.fire({
          icon: 'error',
          text: s
        });
      })
    }
  }


}
