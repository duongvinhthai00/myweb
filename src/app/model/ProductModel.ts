import { Time } from "@angular/common";

export interface ProductModel{
  id:number,
  pr_name :string,
  pro_slug:string,
  pro_price:number,
  pro_sale :number,
  pro_active :number,
  pro_hot :number,
  pro_pay :number,
  pro_number :number,
  pro_description :string,
  pro_avatar :string,
  pro_content :string,
  pro_view:number,
  created_at:Time
}
