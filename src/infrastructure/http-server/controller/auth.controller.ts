import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "src/core/application/features/commands/CreateUserCommand";
import { AuthUseCase } from "src/core/application/services/AuthUseCases";
import { CreateUserRequet } from "../model/create-user-request";
import { LoginCommand } from "src/core/application/features/commands/LoginCommand";
import { LoginRequet } from "../model/create-login-request";
import { JwtService } from "@nestjs/jwt";
// import { AuthUseCase } from "src/auth/application/auth.usecase";
// import { UserRole } from "src/auth/domain/entities/user.entity";

@ApiBearerAuth('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private command: CommandBus,
        private query: QueryBus,
        private readonly jwtService: JwtService

    ) { }

    @Post('register')
    async register(
        @Body() body: CreateUserRequet
    ) {
        return await this.command.execute(new CreateUserCommand({
            username: body.username,
            password: body.password,
            role: body.role
        }));
    }

    @Post('login')
    async login(

        @Body() body: LoginRequet
    ) {

        return await this.command.execute(
            new LoginCommand(body.username, body.password)
        );
    }
    
    @Get('check-status')
    @ApiBearerAuth('Auth')
    async checkStatus(@Req() req) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return {
                    status: 'unauthorized',
                    message: 'No token provided'
                };
            }

            const token = authHeader.split(' ')[1];
            const payload = await this.jwtService.verifyAsync(token);

            return {
                accessToken: token,
                user: {
                    username: payload.username,
                    role: payload.role
                }
            };
        } catch (err) {
            return {
                status: 'unauthorized',
                message: 'Invalid or expired token'
            };
        }
    }




}