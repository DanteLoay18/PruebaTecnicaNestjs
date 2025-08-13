import { Inject, Module } from '@nestjs/common';
// import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { CqrsModule } from '@nestjs/cqrs';

import { PersistenceModule } from 'src/infrastructure/presistence/persistence.module';
import {  CATEGORIA_REPOSITORY, CategoriaRepository, UserRepository } from './domain/ports/outbound';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdaptersModule, USER_REPOSITORY } from 'src/infrastructure/adapters/adapters.module';
import { CreateUserHandler } from './application/features/commands/handlers/CreateUserCommandHandler';
import { AuthService } from './domain/services/AuthService';
import { AuthUseCase } from './application/services/AuthUseCases';
import { CategoriaService } from './domain/services/CategoriaService';
import { CategoriaUseCase } from './application/services/CategoriaUseCases';
import { CreateCategoriaCommandHandler } from './application/features/commands/handlers/CreateCategoriaCommandHandler';
import { GetCategoriasQuery } from './application/features/queries/CategoriaQuery';
import { GetCategoriasQueryHandler } from './application/features/queries/handlers/CategoriaQueryHandler';
import { ProductoService } from './domain/services/ProductoService';
import { PRODUCTO_REPOSITORY, ProductoRepository } from './domain/ports/outbound/ProductoRepository';
import { ProductoUseCases } from './application/services/ProductoUseCases';
import { CreateProductoCommandHandler } from './application/features/commands/handlers/CreateProductoCommandHandler';
import { GetProductoQueryHandler } from './application/features/queries/handlers/ProductoQueryHandler';
import { GetProductoPaginatedQueryHandler } from './application/features/queries/handlers/ProductoPaginatedQueryHandler';
import { LoginCommandHandler } from './application/features/commands/handlers/LoginHandler';
import { SharedModule } from 'src/infrastructure/shared/shared.module';
import { ConfigService } from '@nestjs/config';

export const EVENTBUS = 'EVENTBUS'

const providers = [
  
  CreateUserHandler,
  CreateCategoriaCommandHandler,
  GetCategoriasQueryHandler,
  CreateProductoCommandHandler,
  GetProductoQueryHandler,
  GetProductoPaginatedQueryHandler,
  LoginCommandHandler
  
]

@Module({
  imports: [
    PersistenceModule,
    AdaptersModule,
    CqrsModule,
    SharedModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    
  ],
  providers: [
    ...providers,
    
    {
      provide: AuthService,
      useFactory: (repository: UserRepository) => new AuthService(repository, new JwtService()),
      inject: [USER_REPOSITORY]
    },
    {
      provide: AuthUseCase,
      useFactory: (auth: AuthService) => new AuthUseCase(auth),
      inject:[
        AuthService
      ]
    },
    {
      provide:CategoriaService,
      useFactory:(repository:CategoriaRepository)=> new CategoriaService(repository),
      inject:[CATEGORIA_REPOSITORY]

    },
    {
      provide: CategoriaUseCase,
      useFactory:(service:CategoriaService)=>new CategoriaUseCase(service),
      inject:[CategoriaService]
    },
    {
      provide:ProductoService,
      useFactory:(repository:ProductoRepository)=> new ProductoService(repository),
      inject:[PRODUCTO_REPOSITORY]

    },
    {

      provide: ProductoUseCases,
      useFactory:(service:ProductoService)=>new ProductoUseCases(service),
      inject:[ProductoService]

    },

    {
      provide: AuthService,
      useFactory: (repository: UserRepository, configService: ConfigService) => {
        const jwtService = new JwtService({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
        });
        return new AuthService(repository, jwtService);
      },
      inject: [USER_REPOSITORY, ConfigService],
    }
    
  ],
  exports: [
    // PurchaseUseCases,
    CqrsModule,
    AdaptersModule,
    JwtModule,
    
    ...providers,
    // AuthUseCase
  ]
})
export class CoreModule {

 

}

