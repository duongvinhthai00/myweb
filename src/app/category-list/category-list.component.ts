import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  quickView : ProductModel;
  images : ImageModel[];
  maxPageItems = 2;
  page:number = 1;
  ProductList : ProductModel[];
  CategoryDetail : CategoryModel =null;
  constructor(private homeService : HomeServiceService,private route :ActivatedRoute,private productService : ProductServiceService) { }
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
          console.log(data);
          this.ProductList = data;
          this.quickView = this.ProductList[0];
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

  ProducDetail(event){
    this.quickView = event;
    this.productService.getImagesByProduct(this.quickView.id).subscribe(data=>{
      this.images = data;
    })
  }



}
