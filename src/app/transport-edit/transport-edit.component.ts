import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TransportModel } from '../model/TransactionModel';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-transport-edit',
  templateUrl: './transport-edit.component.html',
  styleUrls: ['./transport-edit.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class TransportEditComponent implements OnInit {
  transportForm : any;
  transport : TransportModel;
  constructor(private transactionService : TransactionServiceService,private router : Router,
    private route : ActivatedRoute) { }

  error : any;
  ngOnInit(): void {
    this.route.params.pipe(pluck('slug')).subscribe(slug=>{
      this.transactionService.GetTransportById(slug).subscribe(data=>{
        this.transport = data;
        this.transportForm = new FormGroup({
          id : new FormControl(this.transport.id),
          name : new FormControl(this.transport.name),
          time : new FormControl(this.transport.time),
          fee : new FormControl(this.transport.fee)
        });
      });
    });
  }

  Submit(){
    this.transactionService.AddTransport(this.transportForm.value).subscribe(data=>{
      Swal.fire({
        icon : 'success',
        title: "Cập Nhật Phương Thức Thành Công"
      });
      this.router.navigate(['/admin/transport-manager']);
    },(error)=>{
      this.error = error.error;
    })
  }
}
