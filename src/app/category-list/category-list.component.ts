import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CategoryModel } from '../model/CategoryModel';
import { HomeServiceService } from '../service/user_service/home_service/home-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  CategoryDetail : CategoryModel =null;
  constructor(private homeService : HomeServiceService,private route :ActivatedRoute) { }
  CateGoryList : CategoryModel[];
  ngOnInit(): void {
    this.route.params.pipe(pluck("slug")).subscribe(
      data=>{
        this.homeService.getCateGoryById(data).subscribe(data1=>{
          this.CategoryDetail = data1;
          this.homeService.getCateGoryDiffer(this.CategoryDetail.c_group_id.id,this.CategoryDetail.id).subscribe(data=>{
            this.CateGoryList = data;
            console.log(this.CateGoryList);
          })
        });

      }
    )
  }


}
