import { Component, OnInit } from '@angular/core';
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';

@Component({
  selector: 'app-adminmainpage',
  templateUrl: './adminmainpage.component.html',
  styleUrls: ['./adminmainpage.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
]
})
export class AdminmainpageComponent implements OnInit {
  totalMoney : number = 0;
  constructor(private TransactionSer : TransactionServiceService) { }

  ngOnInit(): void {
    this.TransactionSer.GetRevenue('1999-01-01','2222-01-01').subscribe(data=>{
      this.totalMoney = data.total;
      console.log(this.totalMoney);
    });
  }

}
