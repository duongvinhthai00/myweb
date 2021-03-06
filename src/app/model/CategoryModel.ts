import { AdminModel } from "./AdminModel";

export interface CategoryGroupModel{
  id ?: number,
  name ?: string,
  group_author_id ?: AdminModel 
}


export interface CategoryModel{
  id : number,
  name : string,
  c_name : string,
  c_total_product : number,
  c_group_id : CategoryGroupModel,
  c_author_id ?: AdminModel
}
