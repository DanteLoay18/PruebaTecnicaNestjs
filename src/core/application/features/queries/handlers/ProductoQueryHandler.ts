

// src/core/application/features/queries/handlers/GetCategoriasHandler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import{ CATEGORIA_REPOSITORY, type CategoriaRepository } from 'src/core/domain/ports/outbound';
import { Categoria } from 'src/core/domain/Categoria';
import { GetCategoriasQuery } from '../CategoriaQuery';
import { Inject } from '@nestjs/common';
import { GetProductoQuery } from '../ProductoQuery';
import { PRODUCTO_REPOSITORY, type ProductoRepository } from 'src/core/domain/ports/outbound/ProductoRepository';
import { Producto } from 'src/core/domain/Producto';

@QueryHandler(GetProductoQuery)
export class GetProductoQueryHandler implements IQueryHandler<GetProductoQuery> {
  constructor( @Inject(PRODUCTO_REPOSITORY)private readonly productoRepo: ProductoRepository) {}

  async execute(query: GetProductoQuery): Promise<Producto[]> {
    return this.productoRepo.findAll();
  }
}
