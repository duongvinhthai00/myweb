import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './main/app-routing.module';
import { AppComponent } from './main/app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { CategoryListComponent } from './category-list/category-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CardComponent } from './card/card.component';
import { TransactionComponent } from './transaction/transaction.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ProductsComponent } from './products/products.component';
import { AdminmainpageComponent } from './adminmainpage/adminmainpage.component';
import { ProductmanagerComponent } from './productmanager/productmanager.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductAddComponent } from './product-add/product-add.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { OrderManagerDetailComponent } from './order-manager-detail/order-manager-detail.component';
import { OrderManagerEditComponent } from './order-manager-edit/order-manager-edit.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentManagerComponent } from './payment-manager/payment-manager.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { TransportManagerComponent } from './transport-manager/transport-manager.component';
import { TransportAddComponent } from './transport-add/transport-add.component';
import { TransportEditComponent } from './transport-edit/transport-edit.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ChartsModule } from 'ng2-charts';
import { UserAccountComponent } from './user-account/user-account.component';
import { CategoryGroupComponent } from './category-group/category-group.component';
import { CategorySubComponent } from './category-sub/category-sub.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminhomeComponent,
    CategoryListComponent,
    ProductDetailComponent,
    CardComponent,
    TransactionComponent,
    OrderComponent,
    OrderDetailComponent,
    AdminloginComponent,
    ProductsComponent,
    AdminmainpageComponent,
    ProductmanagerComponent,
    ProductAddComponent,
    ProductEditComponent,
    OrderManagerComponent,
    OrderManagerDetailComponent,
    OrderManagerEditComponent,
    PaymentComponent,
    PaymentManagerComponent,
    PaymentAddComponent,
    PaymentEditComponent,
    TransportManagerComponent,
    TransportAddComponent,
    TransportEditComponent,
    RevenueComponent,
    UserAccountComponent,
    CategoryGroupComponent,
    CategorySubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    CKEditorModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
