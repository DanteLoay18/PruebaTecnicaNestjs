
import { Injectable, BadRequestException } from '@nestjs/common';
import { Producto } from 'src/core/domain/Producto';
import { randomUUID } from 'crypto';
import type{ ProductoRepository } from '../ports/outbound/ProductoRepository';
import { AppResponse } from 'src/infrastructure/http-server/model/app.response';
import { UserRole } from '../User';
import { Paginated } from 'src/core/application/utils/Paginated';

@Injectable()
export class ProductoService {
  constructor(private readonly productoRepository: ProductoRepository) {}

  async createProducto(nombre: string, descripcion: string, precio: number, cantidad: number, categoriaId: string): Promise<AppResponse> {
    if (cantidad < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa');
    }

    const id = randomUUID();
    const producto = new Producto(id, nombre, descripcion, precio, cantidad, categoriaId);
    await this.productoRepository.save(producto);

    return {

      status:200,
      message:'Categoría creada correctamente',
      data:producto


  };


  }

  async updateProducto(producto: Producto): Promise<void> {
    if (producto.cantidad < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa');
    }
    await this.productoRepository.update(producto);
  }

  async deleteProducto(id: string): Promise<void> {
    await this.productoRepository.delete(id);
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


  async getAllProductosPaginated(page: number, size: number, userRole: UserRole): Promise<Paginated<Producto>>{

    const offset=Paginated.getOffset(page,size)

    const allProductos=await this.productoRepository.findAll();

    let filtrarProducto:Producto[]=allProductos;

    if(userRole===UserRole.EMPLEADO){
      filtrarProducto=allProductos.filter(p=>p.cantidad>0);
    }

    const paginateData=filtrarProducto.slice(offset,offset+size);

    return Paginated.create({

      data:paginateData,
      page,
      size,
      count:filtrarProducto.length
    }
      
    )


  }






}
