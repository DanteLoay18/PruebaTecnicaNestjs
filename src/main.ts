import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ServerConfig } from './infrastructure/shared/config/server.config';
import { ConfigService } from '@nestjs/config';
import { generateSwaggerDocs } from './infrastructure/http-server/utils/generate-swagger-docs';
import fastifyCors from '@fastify/cors';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

function getServerConfig(app: INestApplication): ServerConfig {
  const config: ConfigService = app.get(ConfigService)
  return config.get<ServerConfig>('server')!
}

async function bootstrap() {
   const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = getServerConfig(app)
  
  generateSwaggerDocs(app)

  await app.register(fastifyCors, {
    origin: ['http://localhost:4200'],
    credentials: true,
  });

  await app.listen(config.port);

}
bootstrap();