import { Inject, Module } from '@nestjs/common';
// import { AdaptersModule, CUSTOMER_REPOSITORY, EMPLOYEE_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY, SHIPPER_REPOSITORY } from '../infraestructure/adapters/adapters.module';
import { CqrsModule } from '@nestjs/cqrs';

import { PersistenceModule } from 'src/infrastructure/presistence/persistence.module';
import {  UserRepository } from './domain/ports/outbound';
import { JwtService } from '@nestjs/jwt';
import { AdaptersModule, USER_REPOSITORY } from 'src/infrastructure/adapters/adapters.module';
import { CreateUserHandler } from './application/features/commands/handlers/CreateUserCommandHandler';
import { AuthService } from './domain/services/AuthService';
import { AuthUseCase } from './application/services/AuthUseCases';

export const EVENTBUS = 'EVENTBUS'

const providers = [
  // CatalogUseCases,
  // CompanySuppliersUseCases,
  // CompanyUseCases,
  // CustomerPortfolioUseCases,
  // StockUseCases,
  // CreateOrderHandler,
  // OrdersQueryHandler,
  CreateUserHandler
]

@Module({
  imports: [
    PersistenceModule,
    AdaptersModule,
    CqrsModule
  ],
  providers: [
    ...providers,
    // {
    //   provide: OrderService,
    //   useFactory: (
    //     order: OrderRepository,
    //     customer: CustomerRepository,
    //     employee: EmployeeRepository,
    //     shipper: ShipperRepository,
    //     product: ProductRepository,
    //     eventbus: EventBusPublisher
    //   ) => new OrderService(order, customer, employee, shipper, product, eventbus),
    //   inject: [
    //     ORDER_REPOSITORY,
    //     CUSTOMER_REPOSITORY,
    //     EMPLOYEE_REPOSITORY,
    //     SHIPPER_REPOSITORY,
    //     PRODUCT_REPOSITORY,
    //     EVENTBUS
    //   ]
    // },
    // {
    //   provide: ProductService,
    //   useFactory: (product: ProductRepository) => new ProductService(product),
    //   inject: [PRODUCT_REPOSITORY]
    // },
    // {
    //   provide: PurchaseUseCases,
    //   useFactory: (order: OrderService) => new PurchaseUseCases(order),
    //   inject: [
    //     OrderService,
    //   ]
    // },
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
    // {
    //   provide: EVENTBUS,
    //   useExisting: EventBusPublisherService
    // }
  ],
  exports: [
    // PurchaseUseCases,
    CqrsModule,
    AdaptersModule,
    ...providers,
    // AuthUseCase
  ]
})
export class CoreModule {

  // constructor(
  //   @Inject(EVENTBUS) private eventbus: DomainEventBus,
  //   stock: StockUpdaterUseCase,
  //   orderSummary: SaveOrderForReadUseCase
  // ) {
  //   this.eventbus.subscribe(stock)
  //   this.eventbus.subscribe(orderSummary)
  // }

}

