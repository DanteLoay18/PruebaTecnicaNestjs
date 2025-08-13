import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Producto } from "src/core/domain/Producto";
import { ProductoService } from "src/core/domain/services/ProductoService";
import { UserRole } from "src/core/domain/User";
import { Paginated } from "../utils/Paginated";
import { AppResponse } from "src/infrastructure/http-server/model/app.response";

@Injectable()
export class ProductoUseCases {
  constructor(private readonly productoService: ProductoService) {}

  async createProducto(nombre: string, descripcion: string, precio: number, cantidad: number, categoriaId: string) {
    if (cantidad < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa');
    }
    return await this.productoService.createProducto(nombre, descripcion, precio, cantidad, categoriaId);
  }

  async updateProducto(producto: Producto) {
    if (producto.cantidad < 0) {
      throw new BadRequestException("La cantidad no puede ser negativa");
    }

    const existing = await this.productoService.getProductoById(producto.id);
    if (!existing) {
      throw new NotFoundException(`Producto con ID ${producto.id} no encontrado`);
    }

    return await this.productoService.updateProducto(producto);
  }



  async deleteProducto(id: string): Promise<AppResponse> {
    const existing = await this.productoService.getProductoById(id);
    if (!existing) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    return await this.productoService.deleteProducto(id);
  }
  async getProductoById(id: string): Promise<Producto | null> {
    return this.productoService.getProductoById(id);
  }

  async getAllProductos() {
    return await this.productoService.getAllProductos();
  }

  async getProductosPaginated(page: number, size: number,nombre?: string,categoriaId?: string): Promise<AppResponse> {
    if (!Number.isFinite(page) || page < 1) throw new BadRequestException('page inválida');
    if (!Number.isFinite(size) || size < 1) throw new BadRequestException('size inválida');
    return this.productoService.getProductosPaginated(page, size,nombre,categoriaId);
  }


  


}