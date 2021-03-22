import { ProductModel } from "./ProductModel";
import { UserModel } from "./UserModel";

export interface ViewModel{
    id ?: number,
    view_number ?: number,
    rating_number ?: number
    user_id : UserModel,
    pro_id : ProductModel
}