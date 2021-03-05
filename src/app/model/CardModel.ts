import { ProductModel } from "./ProductModel";
import { UserModel } from "./UserModel";

export interface CardModel{
  id ?: number,
  c_qty:number,
  c_product_id:ProductModel,
  c_user_id:UserModel
}
