

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
import { GetReporteQuery } from '../ReporteQuery';

@QueryHandler(GetReporteQuery)
export class GetReporteQueryHandler implements IQueryHandler<GetReporteQuery> {
  constructor( private productoUseCase:ProductoUseCases) {}

  async execute(query: GetReporteQuery): Promise<AppResponse> {
    return this.productoUseCase.getProductosReporte();
  }
}
