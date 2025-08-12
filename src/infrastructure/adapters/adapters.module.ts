import { Module } from '@nestjs/common';

import { PostgresUserRepository } from './domain/postgre-user.repository';
import { UserMapper } from './mapper/UserMapper';
import { PersistenceModule } from '../presistence/persistence.module';


export const USER_REPOSITORY = 'AUTH_REPOSITORY'

const providers = [
    PostgresUserRepository,

    UserMapper,
    {
        provide: USER_REPOSITORY,
        useExisting: PostgresUserRepository,
    },

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
