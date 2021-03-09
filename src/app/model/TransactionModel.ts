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
