import { ClientDto } from "./clients.dto"

export interface RestaurantDto{
    name:string
    address:string
    capacity:number
    clients:ClientDto[]
}