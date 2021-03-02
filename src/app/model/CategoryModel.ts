export interface CategoryGroupModel{
  id : number,
  name : string
}


export interface CategoryModel{
  id : number,
  name : string,
  c_name : string,
  c_total_product : number,
  c_group_id : {
    id : number,
    name : string
  }
}
