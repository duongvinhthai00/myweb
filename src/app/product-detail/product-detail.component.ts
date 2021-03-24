import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('rd1',{static:true}) radio1 : ElementRef<HTMLInputElement>
  @ViewChild('rd2',{static:true}) radio2 : ElementRef<HTMLInputElement>
  @ViewChild('rd3',{static:true}) radio3 : ElementRef<HTMLInputElement>
  @ViewChild('rd4',{static:true}) radio4 : ElementRef<HTMLInputElement>
  @ViewChild('rd5',{static:true}) radio5 : ElementRef<HTMLInputElement>

  isChecked1 = false;
  isChecked2 = false;
  isChecked3 = false;
  isChecked4 = false;
  isChecked5 = false;

  productDetail : ProductModel;
  imageList : ImageModel[];
  checkRating : Boolean =false;
  rattingNumber :number = 0;
  View : ViewModel;
  ProductSuggest : ProductModel[] = [];
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
          this.viewSer.SaveView(viewDTO).subscribe(data=>{
            this.viewSer.GetListProductByUser(user.id,this.productDetail.id,this.productDetail.pro_category_id.c_group_id.id).subscribe(data=>{
              this.ProductSuggest = data;
              console.log(data);
            });
          })
          this.viewSer.CheckRating(viewDTO).subscribe(data=>{
            this.checkRating = data;
          });

          this.viewSer.GetView(data.id,user.id).subscribe(data=>{
            this.View = data;
            switch(data.rating_number){
              case 1 : this.radio1.nativeElement.checked = true;
              break;
              case 2 : this.radio2.nativeElement.checked = true;
              break;
              case 3 : this.radio3.nativeElement.checked = true;
              break;
              case 4 : this.radio4.nativeElement.checked = true;
              break;
              case 5 : this.radio5.nativeElement.checked = true;
              break;
            }
          },(error)=>{
            console.log(error.error.message);
          });

          switch(this.productDetail.pro_rate_number){
            case 1 : this.isChecked1 = true;
              break;
              case 2 : this.isChecked1 = true;this.isChecked2 = true;
              break;
              case 3 : this.isChecked1 = true;this.isChecked2 = true;this.isChecked3 = true;
              break;
              case 4 : this.isChecked1 = true;this.isChecked2 = true;this.isChecked3 = true;this.isChecked4 = true;
              break;
              case 5 : this.isChecked1 = true;this.isChecked2 = true;this.isChecked3 = true;this.isChecked4 = true;this.isChecked5 = true;
              break;
          }
        });
        
        this.productService.getImagesByProduct(slug).subscribe(data=>{
          this.imageList = data;
        });
    });
    
  }

  Submit(){
    const user = JSON.parse(localStorage.getItem(this.userService.keyLogin));
    let viewDTO : ViewModel ={
      user_id  : user,
      pro_id : this.productDetail,
      rating_number : this.rattingNumber
    }
    this.viewSer.SaveRating(viewDTO).subscribe(data=>{
      this.viewSer.UpdateProductRate().subscribe(data=>{})
      Swal.fire({
        icon : "success",
        title : "Đánh Giá Thành Công"
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
