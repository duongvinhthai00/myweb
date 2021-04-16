import { CategorySubComponent } from './../category-sub/category-sub.component';
import { CategoryGroupComponent } from './../category-group/category-group.component';
import { OrderManagerEditComponent } from './../order-manager-edit/order-manager-edit.component';
import { OrderManagerComponent } from './../order-manager/order-manager.component';
import { ProductEditComponent } from './../product-edit/product-edit.component';
import { ProductAddComponent } from './../product-add/product-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { AdminloginComponent } from '../adminlogin/adminlogin.component';
import { AdminmainpageComponent } from '../adminmainpage/adminmainpage.component';
import { CardComponent } from '../card/card.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderComponent } from '../order/order.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductmanagerComponent } from '../productmanager/productmanager.component';
import { ProductsComponent } from '../products/products.component';
import { RegisterComponent } from '../register/register.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { OrderManagerDetailComponent } from '../order-manager-detail/order-manager-detail.component';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentManagerComponent } from '../payment-manager/payment-manager.component';
import { PaymentAddComponent } from '../payment-add/payment-add.component';
import { PaymentEditComponent } from '../payment-edit/payment-edit.component';
import { TransportManagerComponent } from '../transport-manager/transport-manager.component';
import { TransportAddComponent } from '../transport-add/transport-add.component';
import { TransportEditComponent } from '../transport-edit/transport-edit.component';
import { RevenueComponent } from '../revenue/revenue.component';
import { UserAccountComponent } from '../user-account/user-account.component';
import { AdminGuardGuard } from '../guard/admin-guard.guard';
import { UserGuardGuard } from '../guard/user-guard.guard';
import { UserManagerComponent } from '../user-manager/user-manager.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { CommentManagerComponent } from '../comment-manager/comment-manager.component';
import { AdminEditComponent } from '../admin-edit/admin-edit.component';

const routes: Routes = [
  {path:"",component:HomeComponent, children:[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"category/:slug",component:CategoryListComponent},
    {path:"product-detail/:slug",component:ProductDetailComponent},
    {path:"card",canActivate:[UserGuardGuard],component:CardComponent},
    {path:"transaction",canActivate:[UserGuardGuard],component:TransactionComponent},
    {path:"order",canActivate:[UserGuardGuard],component:OrderComponent},
    {path:"order-detail/:slug",canActivate:[UserGuardGuard],component:OrderDetailComponent},
    {path:"all-products",component:ProductsComponent},
    {path:"keyword/:slug",component : ProductsComponent},
    {path:"payment-info/:slug",canActivate:[UserGuardGuard],component:PaymentComponent},
    {path:"user-account",canActivate:[UserGuardGuard],component:UserAccountComponent}
  ]},

  {
    path:"admin",component:AdminhomeComponent,canActivate : [AdminGuardGuard],canActivateChild:[AdminGuardGuard],children : [
      {path:"",component:AdminmainpageComponent},
      {path:"product-manager",component:ProductmanagerComponent},
      {path:"add-product",component:ProductAddComponent},
      {path:"edit-product/:slug",component:ProductEditComponent},
      {path:"order-manager",component:OrderManagerComponent},
      {path:"order-manager-detail/:slug",component:OrderManagerDetailComponent},
      {path:"order-manager-edit/:slug",component:OrderManagerEditComponent},
      {path:"payment-manager",component:PaymentManagerComponent},
      {path:"payment-add",component:PaymentAddComponent},
      {path:"payment-edit/:slug",component:PaymentEditComponent},
      {path:"transport-manager",component:TransportManagerComponent},
      {path:"transport-add",component:TransportAddComponent},
      {path:"transport-edit/:slug",component:TransportEditComponent},
      {path:"revenue",component:RevenueComponent},
      {path:"category-group-manager",component : CategoryGroupComponent},
      {path:"category-manager",component : CategorySubComponent},
      {path:"user-manager",component : UserManagerComponent},
      {path:"user-edit/:slug",component : UserEditComponent},
      {path:"comment-manager",component : CommentManagerComponent},
      {path:"admin-edit",component:AdminEditComponent}
  ]},

    {path:"admin/login",component : AdminloginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
