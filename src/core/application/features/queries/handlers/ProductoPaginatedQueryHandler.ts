import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductoPaginatedQuery } from "../ProductoPaginatedQuery";
import { AppResponse } from "src/infrastructure/http-server/model/app.response";
import { ProductoUseCases } from "src/core/application/services/ProductoUseCases";



@QueryHandler(GetProductoPaginatedQuery)
export class GetProductoPaginatedQueryHandler implements IQueryHandler<GetProductoPaginatedQuery, AppResponse> {
  constructor(private readonly usecases: ProductoUseCases) {}

  async execute(query: GetProductoPaginatedQuery): Promise<AppResponse> {
    const { page, size,nombre,categoriaId } = query;
    return this.usecases.getProductosPaginated(page, size,nombre,categoriaId);
  }
}
