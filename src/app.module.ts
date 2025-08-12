import { Module } from '@nestjs/common';
import { SharedModule } from './infrastructure/shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpServerModule } from './infrastructure/http-server/http-server.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [

    SharedModule,
    CoreModule,
    HttpServerModule,
    CqrsModule, 
    // AuthModule
  ],


})
export class AppModule { }
