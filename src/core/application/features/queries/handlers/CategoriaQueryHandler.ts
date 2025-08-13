
// src/core/application/features/queries/handlers/GetCategoriasHandler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriasQuery } from '../CategoriaQuery';
import { CategoriaUseCase } from 'src/core/application/services/CategoriaUseCases';
import { AppResponse } from 'src/infrastructure/http-server/model/app.response';

@QueryHandler(GetCategoriasQuery)
export class GetCategoriasQueryHandler implements IQueryHandler<GetCategoriasQuery> {
  constructor( private categoriaUseCase : CategoriaUseCase) {}

  async execute(query: GetCategoriasQuery): Promise<AppResponse> {
    return this.categoriaUseCase.getAllCategoria();
  }
}
