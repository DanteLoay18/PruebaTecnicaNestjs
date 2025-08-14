
import { Injectable } from "@nestjs/common";
import { Mapper } from "src/core/shared/Mapper";
import { UserEntity } from "src/infrastructure/presistence/Db/entities/user.entity";
import { User, UserRole } from "src/core/domain/User";
import { CategoriaEntity } from "src/infrastructure/presistence/Db/entities/categoria.entity";
import { Categoria } from "src/core/domain/Categoria";
import { ProductoEntity } from "src/infrastructure/presistence/Db/entities/Producto.entity";
import { Producto } from "src/core/domain/Producto";

@Injectable()
export class ProductoMapper implements Mapper<ProductoEntity[], Producto[]> {

    map(entities: ProductoEntity[]): Producto[] {

        return entities.map(p => new Producto(
            p.id,
            p.nombre,
            p.descripcion,
            p.precio,
            p.cantidad,
            p.categoria?.nombre

        ))

    }

    mapProducto(entity: ProductoEntity): Producto {

        return new Producto(
            entity.id,
            entity.nombre,
            entity.descripcion,
            entity.precio,
            entity.cantidad,
            entity.categoria?.nombre
            
           
        );

    }

    mapProductoEntity(producto: Producto): ProductoEntity {
        const entity = new ProductoEntity();
        entity.id = producto.id;
        entity.nombre = producto.nombre;
        entity.descripcion = producto.descripcion;
        entity.precio = producto.precio;
        entity.cantidad = producto.cantidad;
        entity.categoriaId = producto.categoriaId;
    
        
        entity.categoria = new CategoriaEntity();
        entity.categoria.id = producto.categoriaId;
    
        return entity;
      }

    

}