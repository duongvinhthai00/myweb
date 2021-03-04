import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { CategoryModel } from '../model/CategoryModel';
import { ImageModel, ProductModel } from '../model/ProductModel';
import { HomeServiceService } from '../service/user_service/home_service/home-service.service';
import { ProductServiceService } from '../service/user_service/product_service/product-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  maxPageItems = 2;
  page:number = 1;
  ProductList : ProductModel[];
  ProductListFake : ProductModel[];
  CategoryDetail : CategoryModel =null;
  constructor(private homeService : HomeServiceService,private route :ActivatedRoute,private productService : ProductServiceService,private router : Router) { }
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
          this.ProductList = data;
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
      if(x.pro_price > a && x.pro_price < b){
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

}
