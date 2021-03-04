import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ImageModel, ProductModel } from '../model/ProductModel';
import { ProductServiceService } from '../service/user_service/product_service/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],

})
export class ProductDetailComponent implements OnInit  {
  productDetail : ProductModel;
  imageList : ImageModel[];
  constructor(private productService : ProductServiceService,private route :ActivatedRoute) { }

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

}
