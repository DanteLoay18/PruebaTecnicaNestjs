import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../shared/config/database.config';
import { UserEntity } from './entities/user.entity';
import { TransactionProvider } from './providers/transaction.provider';
import { CategoriaEntity } from './entities/categoria.entity';
import { ProductoEntity } from './entities/Producto.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const database = config.get<DatabaseConfig>('database')
                return {
                    type: 'postgres',
                    host: database!.host,
                    port: database!.port,
                    username: database!.user,
                    password: database!.password,
                    database: database!.name,
                    entities: [
                        UserEntity,
                        CategoriaEntity,
                        ProductoEntity
                    ],
                    ssl:  { rejectUnauthorized: false },
                    
                    synchronize: true,
                    // logging: ['query']
                }
            },
            inject: [ConfigService],
        })
    ],
    providers: [
        TransactionProvider
    ],
    exports: [
        TransactionProvider
    ]
})
export class InventarioDatabaseModule {}
