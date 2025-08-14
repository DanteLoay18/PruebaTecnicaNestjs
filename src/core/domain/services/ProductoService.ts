
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Producto } from 'src/core/domain/Producto';
import { randomUUID } from 'crypto';
import type{ ProductoRepository } from '../ports/outbound/ProductoRepository';
import { AppResponse } from 'src/infrastructure/http-server/model/app.response';
import { UserRole } from '../User';
import { Paginated } from 'src/core/application/utils/Paginated';

@Injectable()
export class ProductoService {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async createProducto(
    nombre: string,
    descripcion: string,
    precio: number,
    cantidad: number,
    categoriaId: string
  ): Promise<AppResponse> {
    if (cantidad <= 0) {
      throw new BadRequestException({

                status: 401,
                message: 'Cantidad no puede ser menor que 0 ',
                data: null
      }
        
      );
    }
  
    
    const productosExistentes = await this.productoRepository.findAll();
    const existeDuplicado = productosExistentes.some(
      p =>
        p.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
        p.categoriaId === categoriaId
    );
  
    if (existeDuplicado) {
      throw new BadRequestException({
                status: 401,
                message: 'Producto ya existe',
                data: null
      }
      );
    }
  
    const id = randomUUID();
    const producto = new Producto(
      id,
      nombre,
      descripcion,
      precio,
      cantidad,
      categoriaId
    );
  
    await this.productoRepository.save(producto);
  
    return {
      status: 200,
      message: 'Producto creado correctamente',
      data: producto
    };
  }
  

  async updateProducto(producto: Producto): Promise<AppResponse> {
    if (producto.cantidad <= 0) {
      throw new BadRequestException({
                status: 401,
                message: 'Cantidad no puede ser negativa',
                data: null
      });
    }
  
    const existing = await this.productoRepository.findById(producto.id);
    if (!existing) {
      throw new NotFoundException({
                status: 401,
                message: 'producto no encontrado',
                data: null
      });
    }
  
    const updated = await this.productoRepository.update(producto);
  
    return {
      status: 200,
      message: 'Producto actualizado correctamenteeee',
      data: updated
    };
  }

  async getProductosReporte(): Promise<AppResponse> {
    const productos = await this.productoRepository.findAllReporte();
    return {
      status: 200,
      message: 'Lista de productos con stock menor o igual a 5',
      data: productos
    };
  }
  
  async deleteProducto(id: string): Promise<AppResponse> {
    const existing = await this.productoRepository.findById(id);
    if (!existing) {
      throw new NotFoundException({

                status: 401,
                message: 'producto no encontrado',
                data: null
      });
    }
  
    await this.productoRepository.delete(id);
  
    return {
      status: 200,
      message: 'Producto eliminado correctamente',
      data: null // opcional, por si quieres devolver los datos del producto eliminado
    };
  }
  

  async getProductoById(id: string): Promise<Producto | null> {
    return this.productoRepository.findById(id);
  }

  async getAllProductos(): Promise<AppResponse> {
    
    const producto= await this.productoRepository.findAll()

    return{

      status: 200,
      message: "Lista de productos",
      data: producto
      

  };

  }

  async getProductosPaginated(page: number, size: number,nombre?: string,categoriaId?: string): Promise<AppResponse> {
    const offset = Paginated.getOffset(page, size);
  
   
    const [productos, total] = await Promise.all([
      this.productoRepository.findAllPaginated(offset, size,nombre,categoriaId),
      this.productoRepository.count()
    ]);
  
    const paginated = Paginated.create({
      results: productos,
      page,
      size,
      count: total
    });
  
    return {
      status: 200,
      message: 'Lista paginada de productos',
      data: paginated
    };
  }
  








}
