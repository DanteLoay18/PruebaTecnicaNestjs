import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioDatabaseModule } from "./Db/inventario-database.module";
import { UserEntity } from "./Db/entities/user.entity";
import { CategoriaEntity } from "./Db/entities/categoria.entity";
import { ProductoEntity } from "./Db/entities/Producto.entity";

@Module({
    imports:[
        InventarioDatabaseModule,
        TypeOrmModule.forFeature([
         UserEntity,CategoriaEntity,ProductoEntity
        ]),
    ],
    exports: [
        InventarioDatabaseModule,
        TypeOrmModule.forFeature([
          UserEntity,CategoriaEntity,ProductoEntity
        ]),
    ]
})
export class PersistenceModule { }