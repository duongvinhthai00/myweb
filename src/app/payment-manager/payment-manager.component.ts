import { Component, OnInit } from '@angular/core';
import { PaymentInfoModel } from '../model/PaymentInfoModel';
import { PaymentServiceService } from '../service/payment_service/payment-service.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-payment-manager',
  templateUrl: './payment-manager.component.html',
  styleUrls: ['./payment-manager.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css'
]
})
export class PaymentManagerComponent implements OnInit {
  paymentList : PaymentInfoModel[] = [];
  paymentListDel : number[]= [];
  constructor(private paymentService : PaymentServiceService) { }

  ngOnInit(): void {
    this.paymentService.GetAllPaymentInfo().subscribe(data=>{
      this.paymentList = data;
    })
  }

  checkedBox(cb){
    if(cb.checked == false){
      cb.checked = true;
      this.paymentListDel.push(JSON.parse(cb.value).id);
      console.log(this.paymentListDel);
    }else{
      cb.checked = false;
      this.paymentListDel = this.paymentListDel.filter(x=>{
        if(x != JSON.parse(cb.value).id){
          return true;
        }
      });
      console.log(this.paymentListDel);
    }
  }

  DeletePaymentInfo(item : PaymentInfoModel){
    Swal.fire({
      icon:'warning',
      title: 'Bạn Có Thực Sự Muốn Xóa Thẻ Này',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText : 'Hủy'
      }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.DeletePaymentInfo(item.id).subscribe(data=>{
          this.paymentService.GetAllPaymentInfo().subscribe(data=>{
            this.paymentList = data;
          });
          this.paymentListDel = this.paymentListDel.filter(x=>{
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

  deleteAllPayment(){
    Swal.fire({
    icon:'warning',
    title: `Bạn Có Thực Sự Muốn Xóa ${this.paymentListDel.length} Thẻ Này`,
    showCancelButton: true,
    confirmButtonText: `Xóa`,
    cancelButtonText : 'Hủy'
    }).then((result) => {
    if (result.isConfirmed) {
      for(let i = 0;i<this.paymentListDel.length;i++){
        this.paymentService.DeletePaymentInfo(this.paymentListDel[i]).subscribe(data=>{
          this.paymentService.GetAllPaymentInfo().subscribe(data=>{
            this.paymentList = data;
          });
        });
      }
      Swal.fire('Xóa Thành Công!', '', 'success');
      this.paymentListDel = [];
    }
    });
  }
}
