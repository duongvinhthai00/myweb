import { TransactionServiceService } from './../service/transaction_service/transaction-service.service';
import { TransactionModel } from 'src/app/model/TransactionModel';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css'
]
})
export class OrderManagerComponent implements OnInit {
  TransactionList : TransactionModel[];
  maxPageItems = 5;
  page:number = 1;
  searchText;
  TransactionListDel : number[] = [];
  TransactionListFake : TransactionModel[];
  constructor(private transactionService : TransactionServiceService) {
   }

  ngOnInit(): void {
    this.transactionService.GetAllTransaction().subscribe(data=>{
      this.TransactionList = this.SortTimeNew(data);
      this.TransactionListFake = [...data];
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

  FilterByStatus(event){
    if(event.currentTarget.value == 10){
      this.TransactionList = this.TransactionListFake
    }else{
      console.log(event.currentTarget.value);
      this.TransactionList = this.TransactionListFake.filter(x=>{
        if(x.tr_status == event.currentTarget.value){
          return true;
        }
      })
    }
  }

  pageChanged(event){
    this.page = event;
  }

  logValue(event){
    this.maxPageItems = event.currentTarget.value;
  }

  checkedBox(cb){
    if(cb.checked == false){
      cb.checked = true;
      this.TransactionListDel.push(JSON.parse(cb.value).id);
      console.log(this.TransactionListDel);
    }else{
      cb.checked = false;
      this.TransactionListDel = this.TransactionListDel.filter(x=>{
        if(x != JSON.parse(cb.value).id){
          return true;
        }
      });
    }
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
        console.log(data);
      })
      this.transactionService.deleteTransaction(item.id).subscribe(data=>{
        this.transactionService.GetAllTransaction().subscribe(data=>{
          this.TransactionList = this.SortTimeNew(data);
        });
      })
      Swal.fire('Xóa Thành Công!', '', 'success')
    }
    });
  }


  deleteAllTransaction(){
    Swal.fire({
    icon:'warning',
    title: `Bạn Có Thực Sự Muốn Xóa ${this.TransactionListDel.length} Giao Dịch Này`,
    showCancelButton: true,
    confirmButtonText: `Xóa`,
    cancelButtonText : 'Hủy'
    }).then((result) => {
    if (result.isConfirmed) {
      for(let i = 0;i<this.TransactionListDel.length;i++){
        this.transactionService.deleteTransaction(this.TransactionListDel[i]).subscribe(data=>{
          console.log(data);
          this.transactionService.GetAllTransaction().subscribe(data=>{
          this.TransactionList = this.SortTimeNew(data);
        });
        });
      }
      Swal.fire('Xóa Thành Công!', '', 'success')
      this.TransactionListDel = [];
    }
    });
  }
}
