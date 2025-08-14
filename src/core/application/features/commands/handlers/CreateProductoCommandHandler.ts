
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCategoriaCommand } from "../CreateCategoriaCommand";
import { CategoriaUseCase } from "src/core/application/services/CategoriaUseCases";
import { CreateProductoCommand } from "../CreareProductoCommand";
import { ProductoUseCases } from "src/core/application/services/ProductoUseCases";



@CommandHandler(CreateProductoCommand)

export class CreateProductoCommandHandler implements ICommandHandler<CreateProductoCommand> {

    constructor(private productoUseCase:ProductoUseCases){}
    
    async execute(command: CreateProductoCommand){
        
        return this.productoUseCase.createProducto(
            command.productoRequest.nombre,
            command.productoRequest.descripcion,
            command.productoRequest.precio,
            command.productoRequest.cantidad,
            command.productoRequest.categoriaId

        );
    }


}