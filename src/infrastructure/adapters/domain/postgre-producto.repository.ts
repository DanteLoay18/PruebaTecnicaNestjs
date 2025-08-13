

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


    async update(producto: Producto): Promise<void> {
        const entity = this.mapper.mapProductoEntity(producto);
        await this.repository.save(entity);
    }

    async findById(id: string): Promise<Producto | null> {

        return this.repository.findOneBy({id})
        .then(entity=>(entity ? this.mapper.mapProducto(entity):null));

    }
    
    async findAll(): Promise<Producto[]> {
        return this.repository.find()
            .then(entities => entities.map(entity => this.mapper.mapProducto(entity)));
    }

    async save(producto: Producto): Promise<void> {
        
        await this.repository.save(producto);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }




}