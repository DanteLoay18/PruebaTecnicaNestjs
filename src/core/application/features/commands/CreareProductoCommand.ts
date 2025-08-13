
import { CreateCategoriaRequest } from "src/core/shared/dto/CreateCategoriaRequest";
import { CreateProductoRequest } from "src/core/shared/dto/ProductoCreateRequest";




export class CreateProductoCommand{

    constructor(public readonly productoRequest:CreateProductoRequest){}
}