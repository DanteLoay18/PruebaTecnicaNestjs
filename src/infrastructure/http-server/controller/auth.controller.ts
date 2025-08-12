import { Body, Controller, Post } from "@nestjs/common";
import { AuthUseCase } from "src/auth/application/auth.usecase";
import { UserRole } from "src/auth/domain/entities/user.entity";

@Controller('auth')
export class AuthController{

    constructor(private readonly authUseCase:AuthUseCase){}

    @Post('register')
    async register(
        @Body() body:{username: string; password: string; role: UserRole}
    ){
        return this.authUseCase.register(body.username,body.password,body.role);
    }

    @Post('login')
    async login(
      @Body() body: { username: string; password: string }
    ) {
      return this.authUseCase.login(body.username, body.password);
    }



}