import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { ViewServiceService } from '../service/view-service/view-service.service';
import { ViewModel } from '../model/ViewModel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],

})
export class ProductDetailComponent implements OnInit  {
  productDetail : ProductModel;
  imageList : ImageModel[];
  checkRating : Boolean =false;
  rattingNumber :number = 0;
  constructor(private productService : ProductServiceService,private route :ActivatedRoute,private cardService : CardServiceService,
    private userService : UserServiceService,private router : Router,private homecomponent : HomeComponent,
    private viewSer : ViewServiceService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem(this.userService.keyLogin));
    this.route.params.pipe(
      pluck('slug')
    ).subscribe(slug=>{
        this.productService.getProductById(slug).subscribe(data=>{
          this.productDetail = data;
          let viewDTO : ViewModel ={
            user_id  : user,
            pro_id : this.productDetail
          }
          setTimeout(()=>{
            this.viewSer.SaveView(viewDTO).subscribe(data=>{
              console.log(data);
            });
          },20000);
          this.viewSer.CheckRating(viewDTO).subscribe(data=>{
            console.log(data);
            this.checkRating = data;
          });
        });
        
        this.productService.getImagesByProduct(slug).subscribe(data=>{
          this.imageList = data;
        });
    })
  }

  Submit(){
    const user = JSON.parse(localStorage.getItem(this.userService.keyLogin));
    let viewDTO : ViewModel ={
      user_id  : user,
      pro_id : this.productDetail,
      rating_number : this.rattingNumber
    }
    this.viewSer.SaveRating(viewDTO).subscribe(data=>{
      alert("Thành Công");
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

 RadioChecked(rd){
   if(rd.checked == true){
      this.rattingNumber = rd.value;
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
