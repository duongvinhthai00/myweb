import { FormGroup, FormControl } from '@angular/forms';
import { TransactionModel, TransportModel } from 'src/app/model/TransactionModel';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionServiceService } from './../service/transaction_service/transaction-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-manager-edit',
  templateUrl: './order-manager-edit.component.html',
  styleUrls: ['./order-manager-edit.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',]
})
export class OrderManagerEditComponent implements OnInit {
  transport_list : TransportModel[];
  formTransaction : any;
  status = [
    {number : 0, title : "Đang Gửi"},
    {number : 1, title : "Đang Xét Duyệt"},
    {number : 2, title : "Đang Giao Hàng"},
    {number : 3, title : "Hoàn Thành"},
    {number : 4, title : "Hủy Giao Dịch"},
  ]
  constructor(private transactionService : TransactionServiceService,private route : ActivatedRoute,
    private router : Router) { }
  transaciton : TransactionModel;
  tr_status;
  ngOnInit(): void {
    this.route.params.pipe(pluck('slug')).subscribe(slug=>{
      this.transactionService.getTransactionByID(slug).subscribe(data=>{
        this.transaciton = data;
        this.formTransaction = new FormGroup({
          id : new FormControl(this.transaciton.id),
          tr_total : new FormControl(this.transaciton.tr_total),
          tr_note : new FormControl(this.transaciton.tr_note),
          tr_address : new FormControl(this.transaciton.tr_address),
          tr_phone : new FormControl(this.transaciton.tr_phone),
          tr_user_id : new FormControl(this.transaciton.tr_user_id),
          name : new FormControl(this.transaciton.name),
          tr_status : new FormControl(this.transaciton.tr_status),
          created_at : new FormControl(this.transaciton.created_at),
          tr_transport_id : new FormControl(this.transaciton.tr_transport_id),
          payment : new FormControl(this.transaciton.payment),
          payment_status : new FormControl(this.transaciton.payment_status)
        });
        
        this.tr_status = this.status.find(x=>{
          return x.number == this.transaciton.tr_status
        });

        this.status = this.status.filter(x=>{
          if(x.number != this.transaciton.tr_status){
            return true;
          }
        });

        this.transactionService.GetAllTransport().subscribe(data=>{
          if(this.transaciton.tr_transport_id?.id != null){
            this.transport_list = data.filter(x=>{
            if(x.id != this.transaciton.tr_transport_id.id){
              return true;
            }
            });
          }else{
            this.transport_list = data;
          }
        });

      });
    });
    
  }
  error : any
  Submit(){
    this.transactionService.updateTransaction(this.formTransaction.value).subscribe(data=>{
    Swal.fire({
        icon: 'success',
        text: 'Cập Nhật Thành Công',
      });
    this.router.navigate(['/admin/order-manager']);
    },(error)=>{
      this.error = error.error;
    });
  }

}
