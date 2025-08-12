import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./domain/services/auth.service";
import { TypeormUserRepository } from "./infrastructure/typeorm/user.repository";
import { AuthUseCase } from "./application/auth.usecase";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User as UserEntityORM } from "./infrastructure/typeorm/user.orm-entity"
import { AuthController } from "src/infrastructure/http-server/controller/auth.controller";
import { USER_REPOSITORY } from "./domain/repositories/user.repository.interface";




@Module({


    imports: [

        TypeOrmModule.forFeature([UserEntityORM]),

        JwtModule.register({
            secret: 'mi_clave_secreta_super_segura',
            signOptions: { expiresIn: '1h' },

        })
    ],
    controllers: [AuthController],

    providers: [AuthUseCase,AuthService,{provide: USER_REPOSITORY,
        useClass: TypeormUserRepository,}],

    exports: [AuthUseCase]

})
export class AuthModule { }