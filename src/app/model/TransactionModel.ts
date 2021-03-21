import { ProductModel } from "./ProductModel";
import { UserModel } from "./UserModel";

export interface TransactionModel{
  id ?: number,
  tr_total: number,
  tr_note?:string,
  tr_address:string,
  tr_phone :string,
  tr_status ?: number,
  created_at?:Date,
  updated_at?:Date,
  name:string,
  tr_user_id:UserModel,
  tr_transport_id : TransportModel,
  payment : number,
  payment_status : number
}

export interface TransportModel{
  id ?: number,
  name : string, 
  time : string,
  fee ?: number
}


export interface OrderModel{
    id :number
    or_qty:number
    or_price : number,
    or_price_old :number
    or_sale : number
    created_at :Date,
    update_at : Date,
    or_transaction_id:TransactionModel,
    or_product_id: ProductModel
}

export interface RevenueModel{
    th1 : number,
    th2 : number,
    th3 : number,
    th4 : number,
    th5 : number,
    th6 : number,
    th7 : number,
    th8 : number,
    th9 : number,
    th10 : number,
    th11: number,
    th12 : number,
    total : number,
}
