import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TransactionModel } from '../model/TransactionModel';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  transactions : TransactionModel[];
  page= 1;
  maxPageItems = 5;
  constructor(private transactionService : TransactionServiceService,private homeComponent :HomeComponent) { }

  ngOnInit(): void {
    this.transactionService.getTransactionByUser(this.homeComponent.userLogined.id).subscribe(data=>{
      this.transactions = this.SortTimeNew(data);
    })
  }

  SortTimeNew(data){
    data.sort((a,b)=>{
      if(a.created_at > b.created_at){
        return -1;
      }
      });
    return data;
  }

  pageChanged(event){
    this.page = event;
  }

  deleteOrder(item : TransactionModel){
  Swal.fire({
  icon:'warning',
  title: 'Bạn Có Thực Sự Muốn Xóa Giao Dịch Này',
  showCancelButton: true,
  confirmButtonText: `Xóa`,
  cancelButtonText : 'Hủy'
  }).then((result) => {
  if (result.isConfirmed) {
    this.transactionService.updateProductNumber(item.id).subscribe(data=>{
    })
    this.transactionService.deleteTransaction(item.id).subscribe(data=>{
      this.transactionService.getTransactionByUser(this.homeComponent.userLogined.id).subscribe(data=>{
      this.transactions = this.SortTimeNew(data);
      });
    })
    Swal.fire('Xóa Thành Công!', '', 'success')
  }
  });

  }
}
