import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminModel } from '../model/AdminModel';
import { AdminServiceService } from '../service/admin_service/admin-service.service';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: [
    '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  ],
})

export class AdminhomeComponent implements OnInit {
  constructor(private router : Router,private adminSer : AdminServiceService) { }
  admin : AdminModel;
  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem(this.adminSer.keyLogin));
  }

  keyAdmin = "adminLogined";
  Logout(){
    localStorage.removeItem(this.keyAdmin);
    this.router.navigate(['/admin/login']);
  }

}
