import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { HomeComponent } from '../home/home.component';
import { CardModel } from '../model/CardModel';
import { ImageModel, ProductModel } from '../model/ProductModel';
import { UserModel } from '../model/UserModel';
import { CardServiceService } from '../service/card_service/card-service.service';
import { ProductServiceService } from '../service/product_service/product-service.service';
import { UserServiceService } from '../service/user_service/user-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],

})
export class ProductDetailComponent implements OnInit  {
  productDetail : ProductModel;
  imageList : ImageModel[];
  constructor(private productService : ProductServiceService,private route :ActivatedRoute,private cardService : CardServiceService,
    private userService : UserServiceService,private router : Router,private homecomponent : HomeComponent) { }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('slug')
    ).subscribe(slug=>{
        this.productService.getProductById(slug).subscribe(data=>{
          this.productDetail = data;
        })
        this.productService.getImagesByProduct(slug).subscribe(data=>{
          this.imageList = data;
        });
    })
  }


  XuLyInputUp(input){
    input.value = parseInt(input.value) + 1;
 }

 XuLyInputDown(input){
   if(parseInt(input.value)>1){
     input.value = parseInt(input.value) - 1;
   }
 }

 private user : UserModel;
 private card : CardModel;
 addToCard(product : ProductModel,qty : string){
  this.user  = JSON.parse(localStorage.getItem(this.userService.keyLogin));
  if(this.user != null){
    this.card = {
      c_qty : parseInt(qty),
      c_product_id : product,
      c_user_id : this.user
    }
    this.cardService.addCard(this.card).subscribe(data=>{
      if(data != null){
        this.cardService.getCard(this.user.id).subscribe(data=>{
          this.homecomponent.totalCard = data.length;
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm Vào Giỏ Hàng Thành Công',
          showConfirmButton: false,
          timer:2000
       })
      }
    },(error)=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: true,
      })
    })
  }
  else{
    this.router.navigate(['/login']);
  }
}

}
