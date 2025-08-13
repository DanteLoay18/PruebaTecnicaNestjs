
import { Injectable } from "@nestjs/common";
import { Mapper } from "src/core/shared/Mapper";
import { UserEntity } from "src/infrastructure/presistence/Db/entities/user.entity";
import { User, UserRole } from "src/core/domain/User";
import { CategoriaEntity } from "src/infrastructure/presistence/Db/entities/categoria.entity";
import { Categoria } from "src/core/domain/Categoria";

@Injectable()
export class CategoriaMapper implements Mapper<CategoriaEntity[], Categoria[]> {

    map(entities: CategoriaEntity[]): Categoria[] {

        return entities.map(cat => new Categoria(
            cat.id,
            cat.nombre,
            cat.descripcion


        ))

    }

    mapCategoria(entity: CategoriaEntity): Categoria {

        return new Categoria(
            entity.id,
            entity.nombre,
            entity.descripcion,
           
        );

    }

    

}