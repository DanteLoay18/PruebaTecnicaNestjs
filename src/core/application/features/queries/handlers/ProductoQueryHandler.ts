

// src/core/application/features/queries/handlers/GetCategoriasHandler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import{ CATEGORIA_REPOSITORY, type CategoriaRepository } from 'src/core/domain/ports/outbound';
import { Categoria } from 'src/core/domain/Categoria';
import { GetCategoriasQuery } from '../CategoriaQuery';
import { Inject } from '@nestjs/common';

import { PRODUCTO_REPOSITORY, type ProductoRepository } from 'src/core/domain/ports/outbound/ProductoRepository';
import { Producto } from 'src/core/domain/Producto';
import { GetProductoQuery } from '../ProductoQuery';
import { ProductoUseCases } from 'src/core/application/services/ProductoUseCases';
import { AppResponse } from 'src/infrastructure/http-server/model/app.response';

@QueryHandler(GetProductoQuery)
export class GetProductoQueryHandler implements IQueryHandler<GetProductoQuery> {
  constructor( private productoUseCase:ProductoUseCases) {}

  async execute(query: GetProductoQuery): Promise<AppResponse> {
    return this.productoUseCase.getAllProductos();
  }
}
