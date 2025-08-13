import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductoPaginatedQuery } from "../ProductoPaginatedQuery";
import { Inject } from "@nestjs/common";
import { PRODUCTO_REPOSITORY, type ProductoRepository } from "src/core/domain/ports/outbound/ProductoRepository";
import { Paginated } from "src/core/application/utils/Paginated";
import { Producto } from "src/core/domain/Producto";
import { UserRole } from "src/core/domain/User";



@QueryHandler(GetProductoPaginatedQuery)
export class GetProductoPaginatedQueryHandler implements IQueryHandler<GetProductoPaginatedQuery> {
  constructor(@Inject(PRODUCTO_REPOSITORY) private readonly productoRepo: ProductoRepository) {}

  async execute(query: GetProductoPaginatedQuery): Promise<Paginated<Producto>> {
    const { page, size, userRole } = query;

    
    const allProductos = await this.productoRepo.findAll();

    
    let filteredProductos: Producto[] = allProductos;
    if (userRole === UserRole.EMPLEADO) {
      filteredProductos = allProductos.filter(p => p.cantidad > 0);
    }


    const offset = Paginated.getOffset(page, size);
    const paginatedData = filteredProductos.slice(offset, offset + size);

    return Paginated.create({
      data: paginatedData,
      page,
      size,
      count: filteredProductos.length,
    });
  }
}
