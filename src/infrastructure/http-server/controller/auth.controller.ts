import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "src/core/application/features/commands/CreateUserCommand";
import { AuthUseCase } from "src/core/application/services/AuthUseCases";
import { CreateUserRequet } from "../model/create-user-request";
// import { AuthUseCase } from "src/auth/application/auth.usecase";
// import { UserRole } from "src/auth/domain/entities/user.entity";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{

    constructor(
       private command: CommandBus,
       private query: QueryBus
    ){}

    @Post('register')
    async register(
        @Body() body:CreateUserRequet
    ){
       return await this.command.execute(new CreateUserCommand({
           username: body.username,
           password: body.password,
           role: body.role
        }));
    }

    @Post('login')
    async login(
      @Body() body: { username: string; password: string }
    ) {
      // return this.authUseCase.login(body.username, body.password);
    }



}