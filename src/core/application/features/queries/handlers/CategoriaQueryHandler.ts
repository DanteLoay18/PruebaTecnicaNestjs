
// src/core/application/features/queries/handlers/GetCategoriasHandler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import{ CATEGORIA_REPOSITORY, type CategoriaRepository } from 'src/core/domain/ports/outbound';
import { Categoria } from 'src/core/domain/Categoria';
import { GetCategoriasQuery } from '../CategoriaQuery';
import { Inject } from '@nestjs/common';

@QueryHandler(GetCategoriasQuery)
export class GetCategoriasQueryHandler implements IQueryHandler<GetCategoriasQuery> {
  constructor( @Inject(CATEGORIA_REPOSITORY)private readonly categoriaRepo: CategoriaRepository) {}

  async execute(query: GetCategoriasQuery): Promise<Categoria[]> {
    return this.categoriaRepo.findAll();
  }
}
