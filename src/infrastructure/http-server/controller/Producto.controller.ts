

import { Body, Controller, Get, Post, Query, Req, UnauthorizedException } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "src/core/application/features/commands/CreateUserCommand";
import { AuthUseCase } from "src/core/application/services/AuthUseCases";
import { CreateUserRequet } from "../model/create-user-request";
import { CreateCategoriaRequest } from "src/core/shared/dto/CreateCategoriaRequest";
import { CreateCategoriaCommand } from "src/core/application/features/commands/CreateCategoriaCommand";
import { CreateCategoriaRequet } from "../model/create-cat-request";
import { GetCategoriasQuery } from "src/core/application/features/queries/CategoriaQuery";
import { CreateProductoRequet } from "../model/create-product.request";
import { CreateProductoCommand } from "src/core/application/features/commands/CreareProductoCommand";
import { GetProductoQuery } from "src/core/application/features/queries/ProductoQuery";
import { GetProductoPaginatedQuery } from "src/core/application/features/queries/ProductoPaginatedQuery";
// import { AuthUseCase } from "src/auth/application/auth.usecase";
// import { UserRole } from "src/auth/domain/entities/user.entity";

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) { }

    @Post('register')
    async register(
        @Body() body: CreateProductoRequet
    ) {
        return await this.command.execute(new CreateProductoCommand({
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            cantidad: body.cantidad,
            categoriaId: body.categoriaId

        }));
    }

    @Get('get-all')
    async getAllProducto() {
        return await this.query.execute(new GetProductoQuery());
    }


    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
    @ApiQuery({ name: 'size', required: false, type: Number, description: 'Cantidad de items por página' })
    @Get('pagination')
    async getProductos(
        @Query('page') page = 1,
        @Query('size') size = 10,
        @Req() req
    ) {
        
        const userRole = req.user?.role;
        if (!userRole) {
            throw new UnauthorizedException('User not found in request');
        }

        return this.query.execute(
            new GetProductoPaginatedQuery(Number(page), Number(size), userRole)
        );
    }
}







