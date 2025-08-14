

import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "src/core/application/features/commands/CreateUserCommand";
import { AuthUseCase } from "src/core/application/services/AuthUseCases";
import { CreateUserRequet } from "../model/create-user-request";
import { CreateCategoriaRequest } from "src/core/shared/dto/CreateCategoriaRequest";
import { CreateCategoriaCommand } from "src/core/application/features/commands/CreateCategoriaCommand";
import { CreateCategoriaRequet } from "../model/create-cat-request";
import { GetCategoriasQuery } from "src/core/application/features/queries/CategoriaQuery";
import { GetReporteQuery } from "src/core/application/features/queries/ReporteQuery";
// import { AuthUseCase } from "src/auth/application/auth.usecase";
// import { UserRole } from "src/auth/domain/entities/user.entity";

@ApiTags('Reporte')
@Controller('reporte')
export class ReporteController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) { }

    

    @Get('get-productos-inventario-bajo')
    async getAllReportes() {
        return await this.query.execute(new GetReporteQuery());
    }




}