import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from 'src/app/model/CommentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http : HttpClient) { }

  addComment(commentDTO : CommentModel){
    return this.http.post<CommentModel>(`http://localhost:8080/api/v12/add-comment`,commentDTO);
  }

  getAllComment(){
    return this.http.get<CommentModel[]>(`http://localhost:8080/api/v12/get-all-comment`);
  }

  getAllCommentByProduct(pro_id : number){
    return this.http.get<CommentModel[]>(`http://localhost:8080/api/v12/get-all-comment-by-product/${pro_id}`);
  }

  deleteCommentById(id : number){
    return this.http.delete<Boolean>(`http://localhost:8080/api/v12/delete-comment/${id}`);
  }
}
