

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
