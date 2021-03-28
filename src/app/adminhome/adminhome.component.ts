import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: [
    '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  ],
})

export class AdminhomeComponent implements OnInit {
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  keyAdmin = "adminLogined";
  Logout(){
    localStorage.removeItem(this.keyAdmin);
    this.router.navigate(['/admin/login']);
  }

}
