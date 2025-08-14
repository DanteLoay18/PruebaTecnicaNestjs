

import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetReporteQuery } from "src/core/application/features/queries/ReporteQuery";
import { Roles, RolesGuard } from "../guards/rol.guard";
import { JwtAuthGuard } from "../guards/auth.guard";

@ApiTags('Reporte')
@Controller('reporte')
export class ReporteController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) { }

    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMINISTRADOR')
    @Get('get-productos-inventario-bajo')
    @ApiBearerAuth('Auth')
    async getAllReportes() {
        return await this.query.execute(new GetReporteQuery());
    }




}