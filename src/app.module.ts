import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './infrastructure/http-server/controller/health.controller';
import { DatabaseService } from './infrastructure/presistence/database.service';
import { AuthController } from './infrastructure/http-server/controller/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({

      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'Unu#2023',
      database: 'InventarioBD',
      autoLoadEntities: true,   // detecta automáticamente tus entidades
      synchronize: true,

    }),
    AuthModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, DatabaseService],


})
export class AppModule { }
