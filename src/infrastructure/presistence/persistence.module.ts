import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioDatabaseModule } from "./Db/inventario-database.module";
import { UserEntity } from "./Db/entities/user.entity";

@Module({
    imports:[
        InventarioDatabaseModule,
        TypeOrmModule.forFeature([
         UserEntity
        ]),
    ],
    exports: [
        InventarioDatabaseModule,
        TypeOrmModule.forFeature([
          UserEntity,
        ]),
    ]
})
export class PersistenceModule { }