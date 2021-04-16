import { ProductModel } from "./ProductModel";
import { UserModel } from "./UserModel";

export interface CommentModel{
    id ?: number,
    user_id : UserModel,
    pro_id : ProductModel,
    content : String,
    created_at ?: Date
}