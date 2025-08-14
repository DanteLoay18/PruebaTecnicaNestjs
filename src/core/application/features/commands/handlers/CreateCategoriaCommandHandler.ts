import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCategoriaCommand } from "../CreateCategoriaCommand";
import { CategoriaUseCase } from "src/core/application/services/CategoriaUseCases";



@CommandHandler(CreateCategoriaCommand)

export class CreateCategoriaCommandHandler implements ICommandHandler<CreateCategoriaCommand> {

    constructor(private categoriaUseCase:CategoriaUseCase){}
    
    async execute(command: CreateCategoriaCommand){
        
        return this.categoriaUseCase.createCategoria(command.createCategoriaRequest.nombre,command.createCategoriaRequest.descripcion);
    }


}