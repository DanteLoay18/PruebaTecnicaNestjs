import { Module } from '@nestjs/common';

import { PostgresUserRepository } from './domain/postgre-user.repository';
import { UserMapper } from './mapper/UserMapper';
import { PersistenceModule } from '../presistence/persistence.module';
import { PostgresCategoriaRepository } from './domain/postgre-cat.repository';
import { CategoriaMapper } from './mapper/CategoriaMapper';
import { CATEGORIA_REPOSITORY } from 'src/core/domain/ports/outbound';
import { PostgresProductoRepository } from './domain/postgre-producto.repository';
import { ProductoMapper } from './mapper/ProductoMapper';
import { PRODUCTO_REPOSITORY } from 'src/core/domain/ports/outbound/ProductoRepository';


export const USER_REPOSITORY = 'AUTH_REPOSITORY'

const providers = [
    PostgresUserRepository,

    UserMapper,

    PostgresCategoriaRepository,
    CategoriaMapper,
    PostgresProductoRepository,
    ProductoMapper,
    {
        provide: USER_REPOSITORY,
        useExisting: PostgresUserRepository,
    },
    {

        provide:CATEGORIA_REPOSITORY,
        useExisting:PostgresCategoriaRepository,

    },
    {

        provide:PRODUCTO_REPOSITORY,
        useExisting:PostgresProductoRepository,
    }

]

@Module({
    imports: [
        PersistenceModule,
    ],
    providers: [
        ...providers
    ],
    exports: [
        ...providers
    ]
})
export class AdaptersModule { }
