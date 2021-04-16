import { Component, OnInit } from '@angular/core';
import { CommentModel } from '../model/CommentModel';
import { CommentServiceService } from '../service/comment_service/comment-service.service';

@Component({
  selector: 'app-comment-manager',
  templateUrl: './comment-manager.component.html',
  styleUrls: ['./comment-manager.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class CommentManagerComponent implements OnInit {

  constructor(private Commentser : CommentServiceService) { }
  comment_list : CommentModel[] = []
  page : number = 1;
  maxPageItems = 10;
  ngOnInit(): void {
    this.Commentser.getAllComment().subscribe(data=>{
      this.comment_list = data.sort((a,b)=>{
      if(a.created_at > b.created_at){
        return -1;
      }
      });
    })
  }

  searchText:any;

  deleteCommentById(id : number,pro_id:number){
    this.Commentser.deleteCommentById(id).subscribe(data=>{
      this.Commentser.getAllComment().subscribe(data=>{
           this.comment_list = data;
      })
    })
  }

  pageChanged(event){
    this.page = event;
  }



}
