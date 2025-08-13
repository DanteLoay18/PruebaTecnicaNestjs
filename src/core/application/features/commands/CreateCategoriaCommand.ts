import { CreateCategoriaRequest } from "src/core/shared/dto/CreateCategoriaRequest";



export class CreateCategoriaCommand{

    constructor(public readonly createCategoriaRequest:CreateCategoriaRequest){}
}