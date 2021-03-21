import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';
import Swal from 'sweetalert2';
import { title } from 'node:process';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transport-add',
  templateUrl: './transport-add.component.html',
  styleUrls: ['./transport-add.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class TransportAddComponent implements OnInit {
  transportForm = new FormGroup({
    name : new FormControl(""),
    time : new FormControl(""),
    fee : new FormControl(0)
  })
  constructor(private transactionService : TransactionServiceService,private router : Router) { }

  error : any;
  ngOnInit(): void {
  }

  Submit(){
    this.transactionService.AddTransport(this.transportForm.value).subscribe(data=>{
      Swal.fire({
        icon : 'success',
        title: "Thêm Phương Thức Thành Công"
      });
      this.router.navigate(['/admin/transport-manager']);
    },(error)=>{
      this.error = error.error;
    })
  }

}
