import { BadRequestException, Injectable } from "@nestjs/common";
import { Producto } from "src/core/domain/Producto";
import { ProductoService } from "src/core/domain/services/ProductoService";
import { UserRole } from "src/core/domain/User";
import { Paginated } from "../utils/Paginated";

@Injectable()
export class ProductoUseCases {
  constructor(private readonly productoService: ProductoService) {}

  async createProducto(nombre: string, descripcion: string, precio: number, cantidad: number, categoriaId: string) {
    if (cantidad < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa');
    }
    return await this.productoService.createProducto(nombre, descripcion, precio, cantidad, categoriaId);
  }

  async updateProducto(producto: Producto): Promise<void> {
    if (producto.cantidad < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa');
    }
    return this.productoService.updateProducto(producto);
  }

  async deleteProducto(id: string): Promise<void> {
    return this.productoService.deleteProducto(id);
  }

  async getProductoById(id: string): Promise<Producto | null> {
    return this.productoService.getProductoById(id);
  }

  async getAllProductos() {
    return await this.productoService.getAllProductos();
  }


  async getAllProductosPaginated(page: number, size: number, userRole: UserRole): Promise<Paginated<Producto>> {
    return await this.productoService.getAllProductosPaginated(page, size, userRole);
  }



}