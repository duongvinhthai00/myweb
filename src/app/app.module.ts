import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
