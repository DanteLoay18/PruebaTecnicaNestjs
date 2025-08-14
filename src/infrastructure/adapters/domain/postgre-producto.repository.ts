

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductoRepository } from "src/core/domain/ports/outbound/ProductoRepository";
import { ProductoEntity } from "src/infrastructure/presistence/Db/entities/Producto.entity";
import { ProductoMapper } from "../mapper/ProductoMapper";
import { Producto } from "src/core/domain/Producto";

@Injectable()
export class PostgresProductoRepository implements ProductoRepository {

    constructor(
        @InjectRepository(ProductoEntity) private repository: Repository<ProductoEntity>,
        private mapper: ProductoMapper,

    ) { }


    async findAllReporte(): Promise<Producto[]> {
        const entities = await this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.categoria', 'categoria')
            .where('producto.cantidad <= :cantidad', { cantidad: 5 })
            .orderBy('producto.cantidad', 'ASC')
            .getMany();

        return entities.map(entity => this.mapper.mapProducto(entity));
    }

    async update(producto: Producto): Promise<Producto> {
        const existing = await this.repository.findOneBy({ id: producto.id });
        if (!existing) {
            throw new Error(`Producto con ID ${producto.id} no encontrado`);
        }

        const entity = this.mapper.mapProductoEntity(producto);
        await this.repository.save(entity);
        

        const updatedEntity = await this.repository.findOneBy({ id: producto.id });
        if (!updatedEntity) {
            throw new Error(`Error al obtener el producto actualizado con ID ${producto.id}`);
        }

        return this.mapper.mapProducto(updatedEntity);
    }


    async findAllPaginated(offset: number, limit: number, nombre?: string, categoriaId?: string): Promise<Producto[]> {

        const query = this.repository.createQueryBuilder('producto')
            .leftJoinAndSelect('producto.categoria', 'categoria');;

        if (nombre) {
            query.andWhere('producto.nombre ILIKE :nombre', { nombre: `%${nombre}%` });
        }


        if (categoriaId) {
            query.andWhere('categoria.nombre ILIKE :nombreCategoria', { nombreCategoria: `%${categoriaId}%` });
        }


        query.skip(offset).take(limit);


        query.orderBy('producto.id', 'ASC');

        const entities = await query.getMany();

        return entities.map(entity => this.mapper.mapProducto(entity));
    }
    count(): Promise<number> {

        return this.repository.count();
    }




    async findById(id: string): Promise<Producto | null> {

        return this.repository.findOneBy({ id })
            .then(entity => (entity ? this.mapper.mapProducto(entity) : null));

    }

    async findAll(): Promise<Producto[]> {
        return this.repository.find()
            .then(entities => entities.map(entity => this.mapper.mapProducto(entity)));
    }

    async save(producto: Producto): Promise<void> {

        await this.repository.save(producto);
    }

    async delete(id: string): Promise<void> {
        const existing = await this.repository.findOneBy({ id });
        if (!existing) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }

        await this.repository.delete(id);
    }



}