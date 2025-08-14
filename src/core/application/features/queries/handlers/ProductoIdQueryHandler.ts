import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductoByIdQuery } from "../ProductoIdQuery";
import { ProductoUseCases } from "src/core/application/services/ProductoUseCases";
import { AppResponse } from "src/infrastructure/http-server/model/app.response";



@QueryHandler(GetProductoByIdQuery)
export class GetProductoByIdQueryHandler implements IQueryHandler<GetProductoByIdQuery> {
  constructor(private readonly productoUseCase: ProductoUseCases) {}

  async execute(query: GetProductoByIdQuery): Promise<AppResponse> {
    return this.productoUseCase.getProductoById(query.id);
  }
}