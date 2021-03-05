import { Time } from "@angular/common";

export interface UserModel{
  id : number
	phone : string,
	avatar: string,
	active: number,
	password: string,
	name: string,
	email: string,
	total_pay: number,
	address: string,
	about: string,
	created_at:Time,
	update_at:Time,
  user_name:string
}



