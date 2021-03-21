import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PaymentInfoModel } from '../model/PaymentInfoModel';
import { PaymentServiceService } from '../service/payment_service/payment-service.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class PaymentEditComponent implements OnInit {
  constructor(private paymentService : PaymentServiceService,private route : ActivatedRoute
    ,private router : Router) { }
  paymentDetail : PaymentInfoModel;
  url = "https://placehold.it/150x100";
  error : any;
  paymentForm : any; 
  ngOnInit(): void {
    this.route.params.pipe(pluck('slug')).subscribe(slug=>{
      this.paymentService.GetPaymentInfoById(slug).subscribe(data=>{
        this.paymentDetail = data;
        this.paymentForm = new FormGroup({
        id : new FormControl(this.paymentDetail.id),
        bank_name : new FormControl(this.paymentDetail.bank_name),
        account_name : new FormControl(this.paymentDetail.account_name),
        account_number : new FormControl(this.paymentDetail.account_number),
        account_seri : new FormControl(this.paymentDetail.account_seri),
        image : new FormControl(this.paymentDetail.image)
        });
        this.url = `../assets/image/${this.paymentDetail.image}`;
      });
    });
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

  Submit(){
    this.paymentService.UpdatePayment(this.paymentForm.value).subscribe(data=>{
      if(this.OneFile != null){
        this.paymentService.UploadFile(this.OneFile,data.id).subscribe(data=>{
        })
      }
      Swal.fire({
        icon : 'success',
        title : 'Cập Nhật Thành Công'
      });
      this.router.navigate(['/admin/payment-manager']);
    },(error)=>{
      this.error = error.error;
    })
  }

}
