import { Component, OnInit } from '@angular/core';
import { TransportModel } from '../model/TransactionModel';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-transport-manager',
  templateUrl: './transport-manager.component.html',
  styleUrls: ['./transport-manager.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css'
]
})
export class TransportManagerComponent implements OnInit {
  transportList : TransportModel[] = [];
  transportListDel : number[] = [];
  constructor(private transactionService : TransactionServiceService) { }

  ngOnInit(): void {
    this.transactionService.GetAllTransport().subscribe(data=>{
      this.transportList = data;
    })
  }


  checkedBox(cb){
    if(cb.checked == false){
      cb.checked = true;
      this.transportListDel.push(JSON.parse(cb.value).id);
      console.log(this.transportListDel);
    }else{
      cb.checked = false;
      this.transportListDel = this.transportListDel.filter(x=>{
        if(x != JSON.parse(cb.value).id){
          return true;
        }
      });
      console.log(this.transportListDel);
    }
  }

  DeleteTransport(item : TransportModel){
      Swal.fire({
      icon:'warning',
      title: 'Bạn Có Thực Sự Muốn Xóa Phương Thức Này',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText : 'Hủy'
      }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService.DeleteTransport(item.id).subscribe(data=>{
          this.transactionService.GetAllTransport().subscribe(data=>{
            this.transportList = data;
          });
          this.transportListDel = this.transportListDel.filter(x=>{
            if(x != item.id){
              return true;
            }
          });
          Swal.fire('Xóa Thành Công!', '', 'success');
        },(error)=>{
          Swal.fire('Xóa Không Thành Công!', '', 'error');
        })  
      }
    });
  }


    deleteAllTransport(){
    Swal.fire({
    icon:'warning',
    title: `Bạn Có Thực Sự Muốn Xóa ${this.transportListDel.length} Phương Thức Này`,
    showCancelButton: true,
    confirmButtonText: `Xóa`,
    cancelButtonText : 'Hủy'
    }).then((result) => {
    if (result.isConfirmed) {
      for(let i = 0;i<this.transportListDel.length;i++){
        this.transactionService.DeleteTransport(this.transportListDel[i]).subscribe(data=>{
          this.transactionService.GetAllTransport().subscribe(data=>{
            this.transportList = data;
          });
        });
      }
      Swal.fire('Xóa Thành Công!', '', 'success');
      this.transportListDel = [];
    }
    });
  }

}
