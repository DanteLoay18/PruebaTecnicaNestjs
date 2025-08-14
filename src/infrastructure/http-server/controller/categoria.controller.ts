
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { CreateCategoriaCommand } from "src/core/application/features/commands/CreateCategoriaCommand";
import { CreateCategoriaRequet } from "../model/create-cat-request";
import { GetCategoriasQuery } from "src/core/application/features/queries/CategoriaQuery";


@ApiTags('Categoria')
@Controller('categoria')
export class CategoriaController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) { }

    @Post('register')
    async register(
        @Body() body: CreateCategoriaRequet
    ) {
        return await this.command.execute(new CreateCategoriaCommand({
            nombre: body.nombre,
            descripcion: body.descripcion,

        }));
    }

    @Get('get-all')
    async getAllCategorias() {
        return await this.query.execute(new GetCategoriasQuery());
    }




}