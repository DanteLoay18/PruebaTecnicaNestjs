

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateProductoRequet } from "../model/create-product.request";
import { CreateProductoCommand } from "src/core/application/features/commands/CreareProductoCommand";
import { GetProductoPaginatedQuery } from "src/core/application/features/queries/ProductoPaginatedQuery";
import { JwtAuthGuard } from "../guards/auth.guard";
import { Roles, RolesGuard } from "../guards/rol.guard";
import { GetProductoQuery } from "src/core/application/features/queries/ProductoQuery";
import { Producto } from "src/core/domain/Producto";
import { UpdateProductoRequet } from "../model/update-product.request";
import { UpdateProductoCommand } from "src/core/application/features/commands/UpdateProductoCommand";

import { DeleteProductoCommand } from "src/core/application/features/commands/DeleteProductoCommand";
import { GetProductoByIdQuery } from "src/core/application/features/queries/ProductoIdQuery";


@ApiTags('Producto')
@Controller('producto')
export class ProductoController {

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) { }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMINISTRADOR')
    @Post('register')
    @ApiBearerAuth('Auth')
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('EMPLEADO', 'ADMINISTRADOR')
    @Get('get-all')
    @ApiBearerAuth('Auth')
    async getAllProducto() {
        return await this.query.execute(new GetProductoQuery);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('EMPLEADO', 'ADMINISTRADOR')
    @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Filtrar por nombre' })
    @ApiQuery({ name: 'categoria', required: false, type: String, description: 'Filtrar por categoría' })
    @ApiQuery({ name: 'size', required: false, type: Number, description: 'Items por página' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
    @Get('pagination')
    @ApiBearerAuth('Auth')
    async getProductos(
        @Query('page') page = 1,
        @Query('size') size = 10,
        @Query('nombre') nombre?: string,
        @Query('categoria') categoriaId?: string,
    ) {
        return this.query.execute(new GetProductoPaginatedQuery(Number(page), Number(size), nombre, categoriaId));
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMINISTRADOR')
    @Put('update')
    @ApiBearerAuth('Auth')
    async updateProducto(

        @Body() body: UpdateProductoRequet
    ) {
        
        const producto = new Producto(
            body.id,
            body.nombre,
            body.descripcion,
            body.precio,
            body.cantidad,
            body.categoriaId
        );

        return await this.command.execute(new UpdateProductoCommand(producto));
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMINISTRADOR')
    @Delete(':id')
    @ApiBearerAuth('Auth')
    async deleteProducto(@Param('id') id: string){
        return await this.command.execute(new DeleteProductoCommand(id));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMINISTRADOR')
    @Get(':id')
    @ApiBearerAuth('Auth')
    async getProductoById(@Param('id') id: string) {
      return this.query.execute(new GetProductoByIdQuery(id));
    }



}







