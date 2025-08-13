
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/core/domain/User";
import { UserEntity } from "src/infrastructure/presistence/Db/entities/user.entity";
import { Repository } from "typeorm";
import { UserMapper } from "../mapper/UserMapper";
import { CategoriaRepository, UserRepository } from "src/core/domain/ports/outbound";
import { CategoriaEntity } from "src/infrastructure/presistence/Db/entities/categoria.entity";
import { CategoriaMapper } from "../mapper/CategoriaMapper";
import { Categoria } from "src/core/domain/Categoria";

@Injectable()
export class PostgresCategoriaRepository implements CategoriaRepository {

    constructor(
        @InjectRepository(CategoriaEntity) private repository: Repository<CategoriaEntity>,
        private mapper: CategoriaMapper,

    ) { }

    async findById(id: string): Promise<Categoria | null> {

        return this.repository.findOneBy({id})
        .then(entity=>(entity ? this.mapper.mapCategoria(entity):null));

    }
    
    async findAll(): Promise<Categoria[]> {
        return this.repository.find()
            .then(entities => entities.map(entity => this.mapper.mapCategoria(entity)));
    }

    async save(categoria: Categoria): Promise<void> {
        
        await this.repository.save(categoria);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }




}