import { Producto } from "src/core/domain/Producto";

export class UpdateProductoCommand {
    constructor(
      public readonly producto: Producto
    ) {}
  }