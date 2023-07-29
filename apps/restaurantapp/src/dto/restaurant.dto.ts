import { ClientDto } from "./clients.dto"

export interface CreateRestaurantDto{
    name:string
    address:string
    capacity:number
    clients:ClientDto[]
}

export class CreateRestaurantSuccessDto{
    message:string
    restaurant:CreateRestaurantDto
}

export class RestaurantError{
    error:string
}

