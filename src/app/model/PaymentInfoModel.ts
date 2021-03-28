import { AdminModel } from "./AdminModel";

export interface PaymentInfoModel{
    id ?: number,
    image ?: string,
    account_name: string,
    account_number: string,
    account_seri: string,
    bank_name : string,
    pay_author_id ?: AdminModel
}