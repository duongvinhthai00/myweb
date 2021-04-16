import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HomeComponent } from '../home/home.component';
import { CardModel } from '../model/CardModel';
import { CategoryModel } from '../model/CategoryModel';
import { ImageModel, ProductModel } from '../model/ProductModel';
import { UserModel } from '../model/UserModel';
import { CardServiceService } from '../service/card_service/card-service.service';
import { HomeServiceService } from '../service/home_service/home-service.service';
import { ProductServiceService } from '../service/product_service/product-service.service';
import { UserServiceService } from '../service/user_service/user-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  maxPageItems = 4;
  page:number = 1;
  ProductList : ProductModel[];
  ProductListFake : ProductModel[];
  CategoryDetail : CategoryModel =null;
  searchText;
  constructor(private homeService : HomeServiceService,private route :ActivatedRoute,private productService : ProductServiceService,private router : Router
    ,private cardService : CardServiceService,private userService : UserServiceService,private homecomponent : HomeComponent) { }
  CateGoryList : CategoryModel[];
  ngOnInit(): void {
     this.route.params.pipe(pluck("slug")).subscribe(
      data=>{
        this.homeService.getCateGoryById(data).subscribe(data1=>{
          this.CategoryDetail = data1;
          this.homeService.getCateGoryDiffer(this.CategoryDetail.c_group_id.id,this.CategoryDetail.id).subscribe(data=>{
            this.CateGoryList = data;
          })
        });
        this.productService.getProductByCategory(data).subscribe(data=>{
          this.ProductList = data.filter(x=>{
            if(x.pro_number>0){
              return true;
            }
          });
          this.ProductListFake = [...this.ProductList];
        })
      }
    )
  }


  pageChanged(event){
    this.page = event;
  }

  logValue(event){
    this.maxPageItems = event.currentTarget.value;
  }

  priceSelected(event){
    if(event.currentTarget.value == 1){
      this.ProductList = this.ProductList.sort((a,b)=>{
        return a.pro_price - b.pro_price;
      });
    }else if(event.currentTarget.value == 2){
      this.ProductList = this.ProductList.sort((a,b)=>{
        return b.pro_price - a.pro_price;
      });
    }
  }

  SortByTimeLess(event){
    this.ProductList = this.ProductList.sort((a,b)=>{
      if(a.created_at < b.created_at){
        return -1;
      }
    });
  }

  SortByTimeNew(event){
    this.ProductList = this.ProductList.sort((a,b)=>{
      if(a.created_at > b.created_at){
        return -1;
      }
    })
  }

  Locgia(a:number,b:number){
    this.ProductList = this.ProductListFake.filter(x=>{
      if(x.pro_pay >= a && x.pro_pay <= b){
        return true;
      }
      return false;
    })
  }

  ResetLuaChon(){
    this.ProductList = this.ProductListFake.sort((a,b)=>{
      return a.id - b.id;
    });
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
          });
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
