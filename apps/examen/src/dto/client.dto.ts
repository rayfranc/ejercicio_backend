export class CreateClientDto{
    
    name:string;
    
    age:number
   
    email:string
    
    phone:string
}

export class CreateClientSuccessDto{
    message:string
    client:CreateClientDto
}

export class CreateClientError{
    error:string
}