import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css',
  '../../assets/TemplateAdmin/dist/css/adminlte.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
  '../../assets/TemplateAdmin/plugins/fontawesome-free/css/all.min.css',
]
})
export class ProductAddComponent implements OnInit {
  description : any;
  content : any;
  constructor() { }

  url = "https://placehold.it/150x100";
  url2 = "https://placehold.it/150x100";
  url3 : string[] = [];
  ngOnInit(): void {
  }

  refresh(){
    this.url3 = [];
  }

  ShowOneFileUpload(event){
    if(event.target.files){
      let render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
      render.onload = (e : any)=>{
        this.url = e.target.result;
      }
    }
  }

  ShowManyFileUpload(event){
    if(event.target.files){
      console.log(event.target.files.length);
      for(let i = 0;i<event.target.files.length;i++){
        let render = new FileReader();
        render.readAsDataURL(event.target.files[i]);
        render.onload = (e : any)=>{
        this.url3.push(e.target.result);
      }
      }
    }
  }

}
