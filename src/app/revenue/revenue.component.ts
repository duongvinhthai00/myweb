import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {Chart} from 'node_modules/chart.js'
import { TransactionServiceService } from '../service/transaction_service/transaction-service.service';
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class RevenueComponent implements OnInit {
  data : number[] = [];
  total : number = 0;
  formDayPicker = new FormGroup({
      fromDay : new FormControl("2021-01-01"),
      toDay : new FormControl("2021-12-31")
  })
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['th1', 'th2', 'th3', 'th4', 'th5', 'th6', 'th7', 'th8', 'th9', 'th10', 'th11', 'th12'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0], label: 'Series A' },
  ];
  
  constructor(private transactionService : TransactionServiceService) {
      
   }



  ngOnInit(): void {
      this.transactionService.GetRevenue(this.formDayPicker.value.fromDay,this.formDayPicker.value.toDay).subscribe(data=>{
        this.total = data.total;
        this.barChartData = [
              {data : [data.th1,data.th2,data.th3,data.th4,data.th5,data.th6,data.th7,data.th8,data.th9,data.th10,data.th11,data.th12], label: 'Số Tiền' }
          ]
      }); 
  }

  Submit(){
    this.transactionService.GetRevenue(this.formDayPicker.value.fromDay,this.formDayPicker.value.toDay).subscribe(data=>{
        this.total = data.total;
        this.barChartData = [
              {data : [data.th1,data.th2,data.th3,data.th4,data.th5,data.th6,data.th7,data.th8,data.th9,data.th10,data.th11,data.th12], label: 'Số Tiền' }
        ]
    });
  }
}
