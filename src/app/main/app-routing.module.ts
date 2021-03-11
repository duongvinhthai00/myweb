import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';
import { CardComponent } from '../card/card.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderComponent } from '../order/order.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsComponent } from '../products/products.component';
import { RegisterComponent } from '../register/register.component';
import { TransactionComponent } from '../transaction/transaction.component';

const routes: Routes = [
  {path:"",component:HomeComponent, children:[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"category/:slug",component:CategoryListComponent},
    {path:"product-detail/:slug",component:ProductDetailComponent},
    {path:"card",component:CardComponent},
    {path:"transaction",component:TransactionComponent},
    {path:"order",component:OrderComponent},
    {path:"order-detail/:slug",component:OrderDetailComponent},
    {path:"all-products",component:ProductsComponent}
  ]},

  {
    path:"admin",component:AdminhomeComponent,children : [

  ]},

  {path:"admin/login",component : AdminloginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
