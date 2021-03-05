import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardModel } from 'src/app/model/CardModel';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor(private http : HttpClient) { }

  addCard(card : CardModel){
    return this.http.post<CardModel>("http://localhost:8080/api/v7/card",card).pipe(
      catchError(this.handleError)
    )
  }

  deleteCard(id : number){
    return this.http.delete(`http://localhost:8080/api/v7/cards/${id}`);
  }

  updateCard(card : CardModel){
    return this.http.put<CardModel>("http://localhost:8080/api/v7/cards",card);
  }

  handleError(error){
    return throwError(error);
  }

  getCard(userId : number){
    return this.http.get<CardModel[]>(`http://localhost:8080/api/v7/cards/${userId}`);
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
