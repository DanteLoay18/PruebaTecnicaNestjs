import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Producto } from "src/core/domain/Producto";
import { ProductoService } from "src/core/domain/services/ProductoService";
import { UserRole } from "src/core/domain/User";
import { Paginated } from "../utils/Paginated";
import { AppResponse } from "src/infrastructure/http-server/model/app.response";
import type { UserRepository } from "src/core/domain/ports/outbound";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { AwsSesService } from "src/core/domain/services/AwsSes.service";



@Injectable()
export class ProductoUseCases {
  constructor(private readonly productoService: ProductoService,
    private readonly userRepository:UserRepository,
    private readonly awsSesService: AwsSesService
  ) {}

  async createProducto(nombre: string, descripcion: string, precio: number, cantidad: number, categoriaId: string) {
    if (cantidad <= 0) {
      throw new BadRequestException({

                status: 401,
                message: 'Cantidad no puede ser menor o igual que 0 ',
                data: null


        
      });
    }
    return await this.productoService.createProducto(nombre, descripcion, precio, cantidad, categoriaId);
  }










  async updateProducto(producto: Producto) {
    if (producto.cantidad <= 0) {
      throw new BadRequestException({

                status: 401,
                message: 'Cantidad no puede ser negativa',
                data: null
      });
    }

    const existing = await this.productoService.getProductoById(producto.id);
    if (!existing) {
      throw new NotFoundException({

                status: 401,
                message: 'producto no encontrado',
                data: null
      });
    }

    if (producto.cantidad <= 4) {
      const admins = await this.userRepository.findByRole(UserRole.ADMIN);
      const adminEmails = admins.map(a => a.username); // si username es el email

      if (adminEmails.length > 0) {
        await this.sendLowStockEmail(adminEmails, producto);
      }
    }


    return await this.productoService.updateProducto(producto);
  }

  /*
  private async sendLowStockEmail(emails: string[], producto: Producto) {
    const ses = new SESClient({ region: "us-east-1" });

    const command = new SendEmailCommand({
      Source: "tu-email-verificado@dominio.com", // Debe estar verificado en SES
      Destination: { ToAddresses: emails },
      Message: {
        Subject: { Data: `Stock bajo: ${producto.nombre}` },
        Body: {
          Text: {
            Data: `El producto "${producto.nombre}" tiene stock bajo (${producto.cantidad} unidades).`
          }
        }
      }
    });

    await ses.send(command);
  }
    */


  async deleteProducto(id: string): Promise<AppResponse> {
    const existing = await this.productoService.getProductoById(id);
  
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

  async getProductosReporte(): Promise<AppResponse> {
    return await this.productoService.getProductosReporte();
  }


  


}