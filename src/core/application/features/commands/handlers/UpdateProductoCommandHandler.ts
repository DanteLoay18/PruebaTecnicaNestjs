import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProductoCommand } from "../UpdateProductoCommand";
import { ProductoUseCases } from "src/core/application/services/ProductoUseCases";
import { Producto } from "src/core/domain/Producto";
import { AppResponse } from "src/infrastructure/http-server/model/app.response";

@CommandHandler(UpdateProductoCommand)
export class UpdateProductoHandler implements ICommandHandler<UpdateProductoCommand> {
  constructor(private readonly productoUseCases: ProductoUseCases) {}

  async execute(command: UpdateProductoCommand): Promise<AppResponse> {
    return await this.productoUseCases.updateProducto(command.producto);
  }
}