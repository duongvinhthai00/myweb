import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productmanager',
  templateUrl: './productmanager.component.html',
  styleUrls: ['./productmanager.component.css',
'../../assets/TemplateAdmin/dist/css/adminlte.min.css',
'../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
'../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css'
]
})

export class ProductmanagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
