import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaymentServiceService } from '../service/payment_service/payment-service.service';
@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class PaymentAddComponent implements OnInit {
  keyAdmin = "adminLogined";
  paymentForm = new FormGroup({
    account_name : new FormControl(""),
    account_number : new FormControl(""),
    account_seri: new FormControl(""),
    bank_name : new FormControl(""),
    pay_author_id : new FormControl(JSON.parse(localStorage.getItem(this.keyAdmin)))
  })

  url = "https://placehold.it/150x100";
  constructor(private paymenService :PaymentServiceService,private router :Router) { }

  ngOnInit(): void {
  }

  OneFile : File = null;
  ShowOneFileUpload(event){
    if(event.target.files){
      let render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
      render.onload = (e : any)=>{
        this.url = e.target.result;
      }
    }
    this.OneFile = event.target.files[0];
  }
  error : any;
  Submit(){
    if(this.OneFile == null){
      Swal.fire({
          position: 'center',
          icon : 'error',
          title : 'File Ảnh Không Được Để Trống',
          showConfirmButton : true
        })
      }else{
        this.paymenService.AddPaymentInfo(this.paymentForm.value).subscribe(data=>{
          this.paymenService.UploadFile(this.OneFile,data.id).subscribe(data=>{
            console.log(data);
          });
          Swal.fire({
          icon: 'success',
          text: 'Thêm Thẻ Ngân Hàng Thành Công',
          });
          this.router.navigate(['/admin/payment-manager']);
        },(error)=>{
          this.error = error.error;
        });
        
      }
    }

}
