import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteProductoCommand } from "../DeleteProductoCommand";
import { ProductoUseCases } from "src/core/application/services/ProductoUseCases";
import { AppResponse } from "src/infrastructure/http-server/model/app.response";


@CommandHandler(DeleteProductoCommand)
export class DeleteProductoHandler implements ICommandHandler<DeleteProductoCommand> {
  constructor(private readonly productoUseCases: ProductoUseCases) {}

  async execute(command: DeleteProductoCommand): Promise<AppResponse> {
    return await this.productoUseCases.deleteProducto(command.id);
  }
}
