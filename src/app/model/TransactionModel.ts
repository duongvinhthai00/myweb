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
  tr_user_id:UserModel
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
