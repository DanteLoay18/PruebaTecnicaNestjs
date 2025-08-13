import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import databaseConfig from "./config/database.config";
import serverConfig from "./config/server.config";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [
                databaseConfig,
                serverConfig
            ],
            validationSchema: Joi.object({
                SERVER_PORT: Joi.number().default(3000),
                DATABASE_HOST: Joi.string().default('localhost'),
                DATABASE_PORT: Joi.number().default(5432),
                DATABASE_NAME: Joi.string().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().default('1h'),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
        })
    ],
    exports: [ConfigModule],
})
export class SharedModule { }
